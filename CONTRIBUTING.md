# 🛠 Project Contribution Guide

This guide explains how we (Dhruv, Jeet, Owais) will work together safely without breaking the `main` branch.

---

## 🚨 Contributing Rules
- ❌ Never commit directly to `main`.
- ✅ Everyone works in their own dev branch (`dhruv-dev`, `jeet-dev`, `owais-dev`).
- 🧪 All experiments go inside your sandbox folder:
  - `sandbox-dhruv/`
  - `sandbox-jeet/`
  - `sandbox-owais/`
- 🔀 When your code is tested and working, move it into `frontend/` or `backend/` and open a Pull Request (PR) into `main`.
- 📝 Keep PRs small and include test steps.

---

## 🚀 Step-by-Step Setup

### 1. Clone the repository (first time only)
```bash
git clone https://github.com/dparmar04/IntelliTicketAI.git
cd IntelliTicketAI
```

### 2. Get the latest main
```bash
git checkout main
git pull origin main
```

### 3. Create your personal dev branch (one time only)
- Dhruv
  ```bash
  git checkout -b dhruv-dev
  git push -u origin dhruv-dev
  ```

- Jeet
  ```bash
  git checkout -b jeet-dev
  git push -u origin jeet-dev
  ```

- Owais
  ```bash
  git checkout -b owais-dev
  git push -u origin owais-dev
  ```

## After this, you only need to switch to your dev branch before working:
```bash
  git checkout jeet-dev   # or dhruv-dev / owais-dev
```

### 4. Work inside your sandbox
Example:
  - Jeet → ```sandbox-jeet/ ```
  - Dhruv → ```sandbox-dhruv/ ```
  - Owais → ```sandbox-owais/ ```

### 6. Save your work for example:-
```bash
git add .
git commit -m "feat: add ticket form (sandbox)"
git push -u origin feature/ticket-form 
```

  
  
