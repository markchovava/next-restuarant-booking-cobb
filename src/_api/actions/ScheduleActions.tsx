"use server"

import { cookies } from "next/headers";
import { baseURL } from "../baseURL";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function scheduleByDateTimeAction(date: string, time: string) { 
    const url = `${baseURL}schedule-by-date-time?date=${date}&time=${time}`  
    const res = await fetch( url, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function scheduleByDateTimeViewAction(id: number | string) { 
    const url = `${baseURL}schedule/${id}`  
    const res = await fetch( url, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


/* ---------------------------------- 
    AUTHENTICATION
 ---------------------------------- */
export async function _scheduleByDateTimeAction(date: string, time: string) { 
    const url = `${baseURL}api/schedule-by-date-time?date=${date}&time=${time}`
    
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }   
    
    const res = await fetch( url, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _scheduleSearchAction(search: string) { 
    const url = `${baseURL}api/schedule-search?search=${search}`
    
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }   
    
    const res = await fetch( url, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _scheduleViewAction(id: string | number) { 
    const url = `${baseURL}api/schedule/${id}`
    
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }   
    
    const res = await fetch( url, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _scheduleListAction() { 
    const url = `${baseURL}api/schedule`
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value) { 
        redirect('/auth/login'); 
    }   
    const res = await fetch( url, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _schedulePaginateAction(url: string) { 
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }   
    
    const res = await fetch( url, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _scheduleAdminAction(data: any) { 
    const url = `${baseURL}api/schedule-admin`
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ 
        redirect('/auth/login'); 
    }   
    const res = await fetch( url, {
        'method': 'POST',
        'body': JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${authToken?.value}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}



export async function _scheduleUpdateStatusAction(id: string | number, data: any) { 
    const url = `${baseURL}api/schedule-status/${id}`
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ 
      redirect('/auth/login'); 
    }   
    const res = await fetch( url, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _scheduleDeleteAction(id: string | number, time: string, date: string) { 
    const url = `${baseURL}api/schedule-delete?scheduleId=${id}&time=${time}&date=${date}` 
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value) { 
        redirect('/auth/login'); 
    }
    const res = await fetch( url, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    revalidatePath('/admin/booking/location')
    return await res.json();
}