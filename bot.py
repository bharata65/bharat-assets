from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# तुमचा API Token इथे टाका
TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN_HERE'

# /start कमांडसाठी लॉजिक
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # युजरला जो मेसेज पाठवायचा आहे
    await update.message.reply_text("नमस्कार! आमचे ट्रेडिंग व्हिडिओ पाहण्यासाठी खालील बटण किंवा सूचना पहा.")
    # व्हिडिओ पाठवण्यासाठी (व्हिडिओ फाईलचा मार्ग किंवा URL)
    await update.message.reply_video(video=open('video.mp4', 'rb'), caption="हा घ्या तुमचा ट्रेनिंग व्हिडिओ!")

# बोट सुरू करण्याचा कोड
if __name__ == '__main__':
    app = ApplicationBuilder().token(TOKEN).build()
    
    app.add_handler(CommandHandler("start", start))
    
    print("बोट चालू झाला आहे...")
    app.run_polling()
