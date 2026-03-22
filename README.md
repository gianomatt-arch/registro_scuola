# Registro Elettronico con Angular, Flask e Keycloak

Progetto full stack strutturato come la repo di riferimento `barzagit/keycloak`, con tre blocchi principali:

- `provapp/`: frontend Angular con componenti separati per **Docente** e **Studente**.
- `backend/`: API Flask con autenticazione tramite token Keycloak e wrapper `Database` basato su PyMySQL.
- `keycloak/`: import automatico del realm con ruoli `docente` e `studente`.

## Funzionalità

### Docente
- inserimento di un voto con nome studente, username studente, materia e voto;
- visualizzazione di tutti i voti inseriti.

### Studente
- visualizzazione esclusiva dei propri voti.

## Routing e sicurezza

- login obbligatorio via Keycloak all'apertura dell'app Angular;
- redirect automatico verso `/docente` o `/studente` in base al ruolo Realm;
- guard dedicati per le route docente/studente;
- accesso errato reindirizzato a `/accesso-negato`.

## Avvio rapido

```bash
docker compose up --build
```

Servizi esposti:

- Frontend Angular: http://localhost:4200
- Backend Flask: http://localhost:5000/api/health
- Keycloak: http://localhost:8080

## Utenti demo

- `docente1 / docente123`
- `studente1 / studente123`
- `studente2 / studente123`

## Note tecniche

- I ruoli Keycloak sono creati **a livello di Realm**.
- L'API `/api/voti` è accessibile solo al ruolo `docente`.
- L'API `/api/voti/miei` è accessibile solo al ruolo `studente` e filtra per `preferred_username` del token.
