"use client"
interface PropsInterface{
    name: string,
    value: string
}


export function setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
}

export function getLocalStorage(name: string) {
    localStorage.getItem(name);
}

export function removeLocalStorage(name: string) {
    localStorage.removeItem(name);
}

export function resetLocalStorage() {
    localStorage.clear();
}