const express = require('express');
const ytdl = require('ytdl-core'); // Make sure this line is included
const ffmpeg = require('fluent-ffmpeg');

const TelegramBot = require('node-telegram-bot-api');
const token = 'TOKEN';
const bot = new TelegramBot(token, { polling: true });

const fs = require('fs');
const path = require('path');

// Helper function to sanitize the filename
function sanitizeFilename(filename) {
  return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

const handleYoutubeLink = async (chatId, messageText) => {
  if (ytdl.validateURL(messageText)) {
    try {
    
     let info = await ytdl.getInfo(messageText);
      const videoLengthSeconds = parseInt(info.videoDetails.lengthSeconds, 10);
      const averageBitrate = 128; // Average bitrate in kbps for MP3 files

      // Calculate the estimated file size in MBs. 
      // Formula: ((bitrate in kbps * length in seconds) / 8) / 1024^2 converts to MB
      const estimatedFileSizeMB = ((averageBitrate * videoLengthSeconds) / 8) / 1024;
      // console.log(estimatedFileSizeMB,videoLengthSeconds);

      if (estimatedFileSizeMB > 10) {
        bot.sendMessage(chatId, "The video is too long and the resulting MP3 would likely exceed the file size limit.");
        return;
      }
      
 
      let format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
      let stream = ytdl.downloadFromInfo(info, { format: format });

      // Sanitize the video title to use as the filename
      const safeTitle = sanitizeFilename(info.videoDetails.title);
      // Define the file path to save the MP3, including the uploads directory
      const filePath = path.join(__dirname, 'uploads', `${safeTitle}.mp3`);

      ffmpeg(stream)
        .audioBitrate(128)
        .save(filePath)
        .on('end', async () => {
          // Ensure the file exists and get its stats for file size check (optional)
          fs.stat(filePath, async (err, stats) => {
            if (err) {
              console.error('Error accessing file:', err);
              bot.sendMessage(chatId, 'There was an error processing your file.');
              return;
            }

            // Example file size check or other logic can go here

            // Send the audio file
            await bot.sendAudio(chatId, filePath).then(() => {
              // Optionally delete the MP3 file after sending to save space
              fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting file:', err);
              });
            });
          });
        });
    } catch (error) {
      console.error('Error processing YouTube link:', error);
      bot.sendMessage(chatId, 'Failed to process your request.');
    }
  }
};


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  handleYoutubeLink(chatId, messageText);
});

module.exports = bot;