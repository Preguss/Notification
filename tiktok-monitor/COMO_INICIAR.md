# 🚀 Como Iniciar o TikTok Monitor

## ⚡ Forma Rápida (Recomendado)

Clique duas vezes neste arquivo:
- **`START.cmd`** 

Isso vai abrir 2 janelas:
- Backend (porta 5000)
- Frontend (porta 5173)

Após alguns segundos, acesse: **http://localhost:5173**

---

## 📊 Como Usar

### 1. Adicionar Conta
- Digite o nome de usuário: `pregu_s`
- Clique em "Adicionar Conta"
- Pronto! Os dados vão ser buscados do TikTok

### 2. Atualizar Dados
- Clique no botão 🔄 para atualizar manualmente
- Ou espere o sistema verificar a cada 5 minutos

### 3. Ver Notificações
- No lado direito há um painel de notificações
- Mostra todas as mudanças detectadas

---

## 📝 Dados Persistem?

✅ **SIM!** Os dados agora persistem usando MongoDB Atlas (cloud)

A string de conexão está em: `backend/.env`

---

## 🔧 Forma Manual (Se preferir)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🌍 URLs Importante

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/api/health

---

## ⚠️ Se algo não funcionar

1. Verifique se as 2 janelas estão abertas (Backend e Frontend)
2. Atualize o navegador (F5)
3. Verifique se as portas 5000 e 5173 estão livres
4. Se a conexão com MongoDB falhar, será usado dados em memória

---

## 💡 Dica

Para fechar tudo, simplesmente feche as 2 janelas do terminal que abriram!

---

**Sistema TikTok Monitor v1.0** 🎵
