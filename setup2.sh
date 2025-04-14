echo "🔧 Setting up Vehicle-Vision-AI environment..."

# Python dependencies
if [ -f "requirements.txt" ]; then
  echo "📦 Installing Python dependencies..."
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
else
  echo "⚠️ No requirements.txt found!"
fi

# Node.js dependencies (for frontend, if applicable)
if [ -f "package.json" ]; then
  echo "📦 Installing Node.js dependencies..."
  npm install
else
  echo "⚠️ No package.json found!"
fi

echo "✅ Setup complete! You're ready to go."
