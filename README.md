![GitHub all releases](https://img.shields.io/github/downloads/Umid-ismayilov/br_music/total)
![GitHub language count](https://img.shields.io/github/languages/count/Umid-ismayilov/br_music)
![GitHub top language](https://img.shields.io/github/languages/top/Umid-ismayilov/br_music?color=yellow)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/Umid-ismayilov/br_music)
![GitHub forks](https://img.shields.io/github/forks/Umid-ismayilov/br_music?style=social)
![GitHub Repo stars](https://img.shields.io/github/stars/Umid-ismayilov/br_music?style=social)


## Features

- Download YouTube videos as MP3.
- Telegram bot interaction for easy use.
- Support for video conversion with `ffmpeg`.
- Easy deployment with `pm2` for continuous operation.

## Getting Started
  These instructions will get you a copy of the project up and running on your server for development and production use.
  
### Prerequisites
- A server with Ubuntu installed.
- Node.js installed on your server.
- A Telegram bot token.

### Installation
 1. **Install Dependencies**
     First, update your package manager and install youtube-dl and ffmpeg:

```bash
sudo apt update
sudo apt install youtube-dl ffmpeg -y
```

2. **Setup Your Node.js Application**
   Create a directory for your project and initialize it:

```bash
mkdir telegram-youtube-mp3
cd telegram-youtube-mp3
npm init -y # Skip if you already have a package.json file
```
  
    Install necessary Node.js packages:
```bash
npm install express node-telegram-bot-api fluent-ffmpeg ytdl-core --save
```
3. **Configure Your Telegram Bot**
   Replace the placeholder in your code with your actual Telegram bot token obtained from BotFather.

4. **Run Your Application:**
```bash
node app.js
```
4. **Deployment with PM2**
  Ensure your application keeps running with PM2:

```bash
npm install pm2 -g
pm2 start app.js --name="telegram-bot"
pm2 list
pm2 monit
pm2 stop telegram-bot
pm2 restart telegram-bot
```
   




  






