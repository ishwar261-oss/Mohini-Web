# 🤖 MOHINI AI – AI Developer Assistant Platform

> A powerful AI Developer Assistant desktop application built with Java Swing + FlatLaf.
> Generates production-level code, debugs errors, optimizes performance, and plans project architectures across 10+ languages.
> Powered by OpenRouter API (GPT-4o-mini). Created by **@IDZz**.

---

## ✨ Features

### 🛠 Developer Tools (NEW)

| Feature | Description |
|---------|-------------|
| ⚡ **AI Code Generator** | Multi-step pipeline: describe project → architecture plan → module-by-module code generation → validation → formatting → export |
| 🐞 **AI Debug Assistant** | Paste any error or stack trace → root cause analysis → corrected code with explanations |
| 🔧 **Code Optimizer** | AI-powered refactoring with performance fixes, better algorithms, design patterns, and security improvements |
| 📖 **Documentation Helper** | Auto-generate Javadoc, docstrings, method docs, parameter descriptions, and usage examples |
| 🏗 **Architecture Planner** | Generates complete project structure with directories, files, dependencies, and module responsibilities |
| 🌐 **Multi-Language Support** | Auto-detects Java, Python, C++, C, JavaScript, TypeScript, Node.js, React, HTML/CSS, SQL |
| 📋 **Code Export** | Copy to clipboard, download individual files, or export full projects |

### 🤖 AI Assistant Features

| Feature | Description |
|---------|-------------|
| 🤖 **Autonomous Agent** | AI agent that plans and executes multi-step tasks |
| 🔮 **Visualize & Explain** | Generate visual diagrams with native Swing rendering and concept explanations |
| 🎙 **Voice & Vision** | Full voice-to-text recording and image analysis support |
| 🗺 **Roadmap Gen** | Generate 8-week structured study roadmaps for any topic |
| 📝 **Interactive Quizzes** | Generate 10 multiple-choice questions on any topic with feedback |
| 📊 **PPT Generator** | Automatically generate and download PowerPoint presentations |
| 🏥 **Health Diag** | AI-powered symptom analysis and educational health diagnosis |
| 📄 **PDF & Doc Intel** | Extract and analyze content from PDF and text files |
| 🔒 **Encrypted Storage** | Sensitive user data, progress, and memory stored with AES-256 |
| ⚡ **20+ Commands** | Slash commands for everything (`/agent`, `/visualize`, `/debug`, etc.) |
| 📋 **To-Do System** | Add, complete, delete tasks with persistent JSON storage |
| 🗒 **Smart Notes** | Create, edit, export notes with Markdown-ready split-pane editor |
| 🔊 **Text-to-Speech** | PowerShell Zira TTS engine reads AI responses in a natural voice |
| 🔍 **Fact-Check AI** | Detects hallucinations, automatically verifies claims |
| 💡 **Explainable AI** | XAI mode explains "the why" behind every recommendation |
| 🤔 **Intent Analysis** | Detects vague queries and asks clarifying questions |
| 📊 **Algorithm Visualizer** | Interactive visualization of sorting and searching algorithms |
| 🎨 **Modern Dark UI** | FlatLaf dark theme with sidebar navigation and 12 panels |

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
├── ai/                  # AI service layer
│   ├── Message.java
│   └── OpenAIService.java
├── commands/            # Slash command system
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
├── dev/                 # Developer tools (NEW)
│   ├── codegen/         # Code generation engine
│   │   ├── CodeGenerationEngine.java
│   │   ├── CodePlanner.java
│   │   ├── CodeChunkGenerator.java
│   │   ├── CodeValidator.java
│   │   ├── CodeFormatter.java
│   │   └── CodeGenerationResult.java
│   └── debug/           # Debug & fix engine
│       ├── ErrorAnalyzer.java
│       └── BugFixEngine.java
├── learning/            # Learning engine
│   ├── LearningEngine.java
│   ├── RoadmapGenerator.java
│   ├── ConceptExplainer.java
│   ├── DiagramGenerator.java
│   └── SkillLevelManager.java
├── services/            # Intelligence & service layer
│   ├── FactCheckService.java
│   ├── IntentAnalyzer.java
│   ├── DocumentAnalysisService.java
│   ├── MemoryManager.java
│   └── HealthAnalysisService.java
├── storage/             # Data persistence
│   ├── TodoManager.java
│   ├── NotesManager.java
│   ├── ReminderManager.java
│   └── ChatHistoryManager.java
├── tracking/            # Progress & gamification
│   ├── ProgressTracker.java
│   └── GamificationSystem.java
├── tools/               # Utilities
│   ├── FileManager.java
│   └── TTSEngine.java
├── ui/                  # GUI components
│   ├── Main.java
│   ├── ChatUI.java
│   ├── ChatPanel.java
│   ├── SidebarPanel.java
│   ├── DevToolsPanel.java       # Developer Tools UI (NEW)
│   ├── VisualizationPanel.java
│   ├── QuizPanel.java
│   ├── HealthPanel.java
│   ├── TodoPanel.java
│   ├── NotesPanel.java
│   ├── ReminderPanel.java
│   ├── SettingsPanel.java
│   └── ThemeManager.java
├── visualization/       # Native diagram rendering
│   ├── DiagramPanel.java
│   ├── DiagramParser.java
│   ├── DiagramNode.java
│   ├── DiagramEdge.java
│   └── DiagramLayoutEngine.java
├── algorithms/          # Algorithm visualizer
│   └── AlgorithmVisualizerPanel.java
└── utils/               # Config & validation
    ├── ConfigManager.java
    └── InputValidator.java
```

---

## 🛠 Developer Tools Pipeline

The code generation system follows a multi-step pipeline:

```
User Request
    ↓
Language Detection (auto-detect from 10+ languages)
    ↓
Architecture Plan (directory structure, files, modules)
    ↓
Module-by-Module Code Generation
    ↓
Code Validation (syntax, logic, completeness)
    ↓
Formatting & Cleanup
    ↓
Explanation + Improvement Suggestions
    ↓
Export (copy / download / zip)
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
| `/remember` | `/remember goal learn Java`| Save preferences that influence AI responses |
| `/quiz` | `/quiz Java` | Start a 10-question AI quiz on any topic |
| `/search` | `/search quantum computing` | Search for info |
| `/analyze`| `/analyze` | Analyze uploaded file |
| `/compare`| `/compare React vs Angular` | Compare two technologies or ideas |
| `/summary`| `/summary <text>` | Summarize a long text |
| `/ppt`    | `/ppt AI in Healthcare` | Generate PowerPoint slides |
| `/idea`   | `/idea startup AI` | Generate structured ideas |
| `/plan`   | `/plan build app` | Create execution plans |
| `/debug`  | `/debug <error or code>` | Debug errors and fix code |
| `/roadmap`| `/roadmap Machine Learning` | Generate learning roadmap |
| `/visualize` | `/visualize bubble sort` | Visualize an algorithm |

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
- **PDFBox 3.0 & POI 5.2** — Document parsing & PPT generation
- **AES-256** — Encrypted local storage

---

## 📜 License

Made with ❤ by @IDZz.
