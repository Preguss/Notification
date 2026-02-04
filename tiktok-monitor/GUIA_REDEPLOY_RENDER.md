# 🚀 Guia: Redeploy no Render

## 📱 Passo a Passo Completo

### 1️⃣ Acesse o Dashboard do Render

```
https://dashboard.render.com
```

Você deve ver uma página assim com seus serviços listados.

### 2️⃣ Procure seu Serviço

Procure pelo serviço chamado **"tiktok-monitor"** ou **"notification"** na lista.

Clique nele para abrir a página do serviço.

### 3️⃣ Procure o Botão "Manual Deploy"

Na página do serviço, no canto superior direito, você vai ver um menu com opções.

Procure por um botão que diga:
- **"Manual Deploy"** ou
- **"Redeploy"** ou
- **"Deploy"**

Clique nele!

### 4️⃣ Aguarde o Deploy

Você vai ver uma tela com:
- **Status**: "Building..." (construindo)
- **Logs**: Mostrando o progresso em tempo real

Aguarde até aparecer:
```
✅ Your service is live 🎉
```

Isso pode levar de 2-5 minutos.

### 5️⃣ Teste o Site

Quando o deploy terminar, acesse:

```
https://notification-9q7u.onrender.com/
```

Você deve ver a aplicação React com:
- ✅ Formulário para adicionar conta TikTok
- ✅ Caixa de input para username
- ✅ Botão "Adicionar Conta"
- ✅ Lista de contas monitoradas
- ✅ Status "Conectado ao servidor"

---

## 🎯 Alternativa Rápida

Se você não conseguir encontrar o botão "Manual Deploy":

1. Na página do serviço, clique em **"Settings"** (canto superior direito)
2. Role para baixo até encontrar uma variável de ambiente
3. Mude qualquer coisa nela (por exemplo: `PORT` de `10000` para `10001`)
4. Clique **"Save"**
5. Mude de volta para o valor original
6. Clique **"Save"** novamente

Isso força um rebuild automático!

---

## 🔧 Se Ainda Não Funcionar

Se após 5 minutos o site ainda mostrar apenas JSON (API):

1. Verifique os **Logs** do Render
2. Procure por erros como:
   ```
   ERROR: Cannot find module...
   ```
   ou
   ```
   ENOENT: no such file or directory...
   ```

3. Se houver erro, vá em **"Clear build cache and redeploy"** nos Settings

4. Aguarde novo build (pode levar 5-10 minutos)

---

## ✅ Quando Funcionar

Você verá uma página assim:

```
┌─────────────────────────────────────┐
│    🎵 TikTok Monitor               │
│                                     │
│  Status: ✅ Conectado ao servidor  │
│                                     │
│  [Adicionar nova conta]             │
│  ┌──────────────────────────────┐   │
│  │ Digite seu @ do TikTok       │   │
│  │ ┌────────────────────────┐   │   │
│  │ │ @pregu_s              │   │   │
│  │ └────────────────────────┘   │   │
│  │         [Monitorar]          │   │
│  └──────────────────────────────┘   │
│                                     │
│  Contas Monitoradas:                │
│  • @pregu_s                         │
│    👥 57 seguindo | 8 seguidores   │
│    🔄 Última atualização: agora    │
│                                     │
└─────────────────────────────────────┘
```

---

## 💡 Dicas Importantes

✅ **Após o redeploy funcionar:**

1. **Adicione sua conta TikTok**
   - Digite: `@pregu_s`
   - Clique em "Monitorar"

2. **Aguarde 5 minutos**
   - O sistema verifica a cada 5 minutos
   - Você verá as métricas aparecerem

3. **Mudanças serão alertadas**
   - Se seguidores aumentarem/diminuírem
   - Se seguindo mudar
   - Se reposts mudarem
   - Uma notificação aparecerá

---

## 🆘 Problemas Comuns

### "Service is not responding"
- Aguarde 30-50 segundos (primeiro carregamento é lento)
- Limpe cache do navegador: `Ctrl + Shift + R`

### "Blank page" ou "Cannot GET /"
- Aguarde mais 2 minutos
- Clique em "Redeploy" novamente
- Verifique os logs para erros

### "API respondendo mas sem formulário"
- O código ainda está no Render (build antigo)
- Clique em "Clear build cache and redeploy"

---

## 📺 URL's Importantes

| O quê | URL |
|------|-----|
| **Site Principal** | https://notification-9q7u.onrender.com |
| **API Health Check** | https://notification-9q7u.onrender.com/health |
| **Dashboard Render** | https://dashboard.render.com |
| **GitHub Repositório** | https://github.com/Preguss/Notification |

---

## 🎉 Pronto!

Depois que o redeploy terminar e o site carregar, você terá um **sistema completo de monitoramento TikTok** funcionando! 

Qualquer dúvida, é só chamar! ✨
