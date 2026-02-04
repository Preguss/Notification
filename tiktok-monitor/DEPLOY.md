# 🚀 Deploy TikTok Monitor no GitHub Pages + Railway

## Passo 1: Preparar o Repositório Local

```bash
cd c:\Users\pregu\tiktok-monitor

# Inicializar git (se ainda não fez)
git init

# Adicionar o remoto
git remote add origin https://github.com/Preguss/Notification.git

# Criar uma pasta para organizar
mkdir -p tiktok-monitor
# Mover arquivos se necessário
```

## Passo 2: Fazer Commit e Push

```bash
# Adicionar todos os arquivos
git add .

# Criar commit
git commit -m "feat: Add TikTok Monitor system"

# Fazer push
git push -u origin main
```

## Passo 3: Configurar Backend no Railway

### 3.1 Criar conta no Railway
- Acesse: https://railway.app
- Faça login com GitHub

### 3.2 Deploy Backend
1. Clique em "New Project"
2. Escolha "Deploy from GitHub repo"
3. Selecione seu repositório `Notification`
4. Configure:
   - **Root Directory**: `tiktok-monitor/backend`
   - **Environment Variables**:
     ```
     MONGODB_URI=mongodb+srv://guest:guest123@cluster0.mongodb.net/tiktok-monitor?retryWrites=true&w=majority
     NODE_ENV=production
     PORT=8000
     ```

### 3.3 Copiar URL do Railway
- Após deploy, pegue a URL gerada (ex: `https://tiktok-monitor-api.railway.app`)
- Atualize `frontend/.env.production`:
  ```
  VITE_API_URL=https://sua-url-do-railway.railway.app
  ```

## Passo 4: Ativar GitHub Pages

1. Vá para Settings do repositório
2. Em "Pages":
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: root
3. Clique Save

## Passo 5: Fazer Deploy Automático

O GitHub Actions fará deploy automático ao fazer push!

**Seu site estará em**: `https://preguss.github.io/Notification/tiktok-monitor/`

---

## 🔄 Fluxo de Trabalho

Sempre que você fizer:
```bash
git add .
git commit -m "sua mensagem"
git push
```

Acontece automaticamente:
1. ✅ Frontend é builda e deployado no GitHub Pages
2. ✅ Backend pode ser redeployado manualmente no Railway

---

## 🆘 Troubleshooting

### GitHub Pages mostra branco
- Verifique se o build rodou em "Actions"
- Confira se `vite.config.js` tem o `base` correto

### API não responde
- Verifique se Railway está rodando
- Confira `VITE_API_URL` em `.env.production`

### CORS error
- Adicione ao `backend/src/app.js`:
```javascript
app.use(cors({
  origin: 'https://preguss.github.io',
  credentials: true
}));
```

---

## 📝 Resumo das URLs

| Componente | URL |
|-----------|-----|
| Frontend (GitHub Pages) | https://preguss.github.io/Notification/tiktok-monitor/ |
| Backend (Railway) | https://seu-projeto.railway.app |
| Repositório | https://github.com/Preguss/Notification |

---

**Pronto! Seu sistema TikTok Monitor está online! 🎉**
