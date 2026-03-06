# 🤖 MOHINI AI – Personal AI Assistant

> A full-featured AI assistant desktop application built with Java Swing + FlatLaf.
> Powered by OpenRouter API (GPT-4o-mini). Created by **@IDZz**.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 💬 **AI Chat** | Natural conversation with GPT-4o-mini via OpenRouter |
| ⚡ **Smart Commands** | 9 slash commands (`/code`, `/calc`, `/todo`, `/notes`, etc.) |
| 📋 **To-Do List** | Add, complete, delete tasks with persistent storage |
| 📝 **Notes** | Create, edit, export notes with split-pane editor |
| ⏰ **Reminders** | Set timed reminders with pop-up notifications |
| 🔊 **Voice TTS** | Text-to-speech using Windows Zira voice |
| 🎨 **Modern UI** | FlatLaf dark theme with sidebar navigation |
| 💾 **Persistence** | All data saved as JSON in `data/` folder |
| 🔒 **Secure** | API key via env var, input sanitization |

---

## 🚀 Quick Start

### Prerequisites
- **Java 11+** (JDK)
- **Maven** (3.6+)
- **OpenRouter API Key** — Get one at [openrouter.ai](https://openrouter.ai)

### Setup

1. **Set your API key** (choose one method):
   ```bash
   # Option A: Environment variable (recommended)
   set OPENROUTER_API_KEY=sk-or-your-key-here

   # Option B: Settings panel inside the app
   ```

2. **Build the project:**
   ```bash
   cd d:\projects\MohiniAI
   mvn clean package -q
   ```

3. **Run:**
   ```bash
   java -jar target/MohiniAI-1.0.jar
   ```

---

## 📁 Project Structure

```
src/main/java/com/mohini/
├── ai/              # AI service layer
│   ├── Message.java
│   └── OpenAIService.java
├── commands/        # Slash command system
│   ├── Command.java (interface)
│   ├── CommandHandler.java
│   ├── CalcCommand.java
│   ├── CodeCommand.java
│   ├── ExplainCommand.java
│   ├── SummarizeCommand.java
│   ├── TodoCommand.java
│   ├── NotesCommand.java
│   ├── ReminderCommand.java
│   ├── SearchCommand.java
│   └── HelpCommand.java
├── storage/         # Data persistence
│   ├── TodoManager.java
│   ├── NotesManager.java
│   ├── ReminderManager.java
│   └── ChatHistoryManager.java
├── tools/           # Utilities
│   ├── FileManager.java
│   └── TTSEngine.java
├── ui/              # GUI components
│   ├── Main.java
│   ├── ChatUI.java
│   ├── ChatPanel.java
│   ├── SidebarPanel.java
│   ├── TodoPanel.java
│   ├── NotesPanel.java
│   ├── ReminderPanel.java
│   ├── SettingsPanel.java
│   └── ThemeManager.java
└── utils/           # Config & validation
    ├── ConfigManager.java
    └── InputValidator.java
```

---

## ⚡ Command Reference

| Command | Usage | Description |
|---------|-------|-------------|
| `/help` | `/help` | List all commands |
| `/calc` | `/calc 2+2*3` | Math calculations |
| `/code` | `/code Python sort a list` | Generate code |
| `/explain` | `/explain recursion` | Explain a concept |
| `/summarize` | `/summarize <text>` | Summarize text |
| `/todo` | `/todo add Buy milk` | Manage to-do list |
| `/notes` | `/notes save My idea` | Save quick notes |
| `/reminder` | `/reminder 10 Take a break` | Set reminder (minutes) |
| `/search` | `/search quantum computing` | Search for info |

### To-Do Sub-commands
- `/todo add <text>` — Add task
- `/todo list` — View all tasks
- `/todo done <number>` — Toggle done
- `/todo delete <number>` — Delete task
- `/todo clear` — Clear completed

### Notes Sub-commands
- `/notes save <content>` — Save a note
- `/notes view [number]` — View notes
- `/notes delete <number>` — Delete a note
- `/notes export` — Export all notes

---

## 🛠 Tech Stack

- **Java 11** + **Swing** — Desktop GUI
- **FlatLaf 3.4** — Modern dark look-and-feel
- **org.json** — JSON parsing
- **OpenRouter API** — AI (GPT-4o-mini)
- **Maven** — Build & dependency management
- **PowerShell System.Speech** — Windows TTS

---

## 📜 License

Made with ❤ by @IDZz for hackathon and personal use.
