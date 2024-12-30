# Custom CMS Documentation

## 📋 Features Checklist

### 1. **Sets Management**

- [ ] **Create Sets**: Ability to create new sets, where each set corresponds to a table in the database.
- [ ] **Manage Entries**: Add, edit, and delete entries in each set.
- [ ] **Search & Filter**: Implement search and filtering functionality for entries.
- [ ] **View Entries**: Display entries with pagination.

### 2. **Authentication**

- [ ] **Passkeys (WebAuthn)**: Implement passkey-based authentication for secure login.
- [ ] **Email & Password**: Provide email and password login as a fallback.
- [ ] **Password Reset**: Implement password reset functionality.

### 3. **API Endpoints**

- [ ] **GET /sets**: Retrieve all sets.
- [ ] **POST /sets**: Create a new set (new database table).
- [ ] **GET /sets/:id**: Retrieve entries from a specific set.
- [ ] **POST /sets/:id**: Add an entry to a specific set.
- [ ] **PUT /sets/:id/:entryId**: Update an entry in a set.
- [ ] **DELETE /sets/:id/:entryId**: Delete an entry from a set

- [ ] **POST /login/email**: Authenticate user using email and password.
<!-- - [ ] **POST /login/passkey**: Register a new user. -->
- [ ] **POST /reset**: Reset password for a user.
