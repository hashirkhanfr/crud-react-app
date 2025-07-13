import { getAuth } from "firebase/auth";

const PROJECT_ID = "internship-2025-465209";
const DATABASE_ID = "hashir";
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents`;
const USERS_COLLECTION = "users";
const MAILS_COLLECTION = "mails";


async function getIdToken() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  return await user.getIdToken();
}

function firestoreDocToUser(doc) {
  const fields = doc.fields || {};
  const user = {};
  for (const key in fields) {
    const valueObj = fields[key];
    if (valueObj.stringValue !== undefined) user[key] = valueObj.stringValue;
    else if (valueObj.integerValue !== undefined) user[key] = parseInt(valueObj.integerValue, 10);
    else if (valueObj.doubleValue !== undefined) user[key] = valueObj.doubleValue;
    else if (valueObj.booleanValue !== undefined) user[key] = valueObj.booleanValue;
    else if (valueObj.timestampValue !== undefined) user[key] = valueObj.timestampValue;
  }
  user.id = doc.name.split("/").pop();
  return user;
}

function userToFirestoreDoc(user) {
  const fields = {};
  for (const key in user) {
    if (key === "id") continue;
    const value = user[key];
    if (typeof value === "string") fields[key] = { stringValue: value };
    else if (typeof value === "number" && Number.isInteger(value)) fields[key] = { integerValue: value.toString() };
    else if (typeof value === "number") fields[key] = { doubleValue: value };
    else if (typeof value === "boolean") fields[key] = { booleanValue: value };
    else if (value instanceof Date) fields[key] = { timestampValue: value.toISOString() };
  }
  return { fields };
}

export async function fetchUsers() {
  const token = await getIdToken();
  const url = `${BASE_URL}/${USERS_COLLECTION}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`fetchUsers error: ${response.status} ${errorText}`);
  }
  const data = await response.json();
  if (!data.documents) return [];
  return data.documents.map(firestoreDocToUser);
}

export async function addUser(user) {
  const token = await getIdToken();
  if (user.id) {
    const url = `${BASE_URL}/${USERS_COLLECTION}/${user.id}?currentDocument.exists=true`;
    const body = JSON.stringify(userToFirestoreDoc(user));
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body,
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`addUser (update) error: ${response.status} ${errorText}`);
    }
    return user;
  } else {
    const url = `${BASE_URL}/${USERS_COLLECTION}`;
    const body = JSON.stringify(userToFirestoreDoc(user));
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body,
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`addUser (create) error: ${response.status} ${errorText}`);
    }
    const data = await response.json();
    const newId = data.name.split("/").pop();
    return { ...user, id: newId };
  }
}

export async function updateUser(user) {
  if (!user.id) throw new Error("User must have an id to update");
  const token = await getIdToken();
  const url = `${BASE_URL}/${USERS_COLLECTION}/${user.id}?currentDocument.exists=true`;
  const body = JSON.stringify(userToFirestoreDoc(user));
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`updateUser error: ${response.status} ${errorText}`);
  }
  return user;
}

export async function deleteUser(userId) {
  const token = await getIdToken();
  const url = `${BASE_URL}/${USERS_COLLECTION}/${userId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`deleteUser error: ${response.status} ${errorText}`);
  }
}

export async function addMail(mail) {
  const token = await getIdToken();
  const url = `${BASE_URL}/${MAILS_COLLECTION}`;
  const body = JSON.stringify({
    fields: {
      to: { stringValue: mail.to },
      subject: { stringValue: mail.subject },
      message: { stringValue: mail.message },
      sentAt: { timestampValue: new Date().toISOString() }
    }
  });
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`addMail error: ${response.status} ${errorText}`);
  }
  const data = await response.json();
  const newId = data.name.split("/").pop();
  return { id: newId, ...mail };
}
