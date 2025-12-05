"use server"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { baseURL } from "../baseURL";




export async function tableSearchAction(search: string) {    
    const res = await fetch(`${baseURL}table-search/${search}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function tableAllAction() {
    const res = await fetch(`${baseURL}table-all/`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function tablePaginateAction(url: string = `${baseURL}table/`) {

    const res = await fetch(`${url}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function tableListAction() {
    const res = await fetch(`${baseURL}table/`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function tableViewAction(id: number | string) {
    const res = await fetch(`${baseURL }table/${id}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


/* --------------------------------------------------- */


export async function _tableSearchAction(search: string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }
    const res = await fetch(`${baseURL}api/table-search?search=${search}`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _tableByLocationIdListAction(id: number | string) {
    const url = `${baseURL}api/table-by-location-id/${id}`;
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ 
        redirect('/auth/login'); 
    }
    const res = await fetch(url, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _tableAllAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }

    const res = await fetch(`${baseURL }api/table-all/`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _tablePaginateAction(url: string = `${baseURL }api/table/`) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }

    const res = await fetch(`${url}`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _tableListAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }
    
    if(!authToken?.value){ redirect('/auth/login'); }
    const res = await fetch(`${baseURL }api/table/`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _tableViewAction(id: number | string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }

    const res = await fetch(`${baseURL }api/table/${id}`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _tableStoreAction(data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }
    
    const res = await fetch(`${baseURL }api/table/`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    revalidatePath('/admin/table');
    return await res.json();
}


export async function _tableUpdateAction(id: string | number, data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }
    
    const res = await fetch(`${baseURL }api/table/${id}`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    revalidatePath(`/admin/table/${id}`);
    return await res.json();
}

export async function _tableDeleteAction(id: number | string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }
    
    const res = await fetch(`${baseURL }api/table/${id}`, {
      'method': 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    });
    revalidatePath('/admin/table');
    return await res.json();
}