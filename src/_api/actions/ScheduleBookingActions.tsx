"use server"
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { baseURL } from "../baseURL";


export async function scheduleBookingByDateTimeScheduleAction(
    scheduleId: string | number, 
    date: string, 
    time: string | number
) {    
  const url = `${baseURL}schedule-booking-by-date-time-schedule?date=${date}&time=${time}&scheduleId=${scheduleId}`
  const res = await fetch(url, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const result = await res.json()
    console.log('THE result', result)
    
    
    return await result;
}


export async function scheduleBookingSearchAction(search: string) {    
    const res = await fetch(`${baseURL}schedule-booking-search/${search}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function scheduleBookingPaginateAction(url: string = `${baseURL}schedule-booking/`) {

    const res = await fetch(`${url}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function scheduleBookingListAction() {
    const res = await fetch(`${baseURL}schedule-booking/`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}

export async function scheduleBookingViewAction(id: number | string) {
    const res = await fetch(`${baseURL}schedule-booking/${id}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


/* --------------------------------------------------- */

export async function _scheduleBookingSearchAction(search: string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }
    
    const res = await fetch(`${baseURL}api/schedule-booking-search?search=${search}`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _scheduleBookingAllAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }

    const res = await fetch(`${baseURL }api/schedule-booking-all/`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _scheduleBookingPaginateAction(url: string) {
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


export async function _scheduleBookingListAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }
    
    if(!authToken?.value){ redirect('/auth/login'); }
    const res = await fetch(`${baseURL}api/schedule-booking/`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _scheduleBookingViewAction(id: number | string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }

    const res = await fetch(`${baseURL}api/schedule-booking/${id}`, {
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    return await res.json();
}


export async function _scheduleBookingStoreAction(data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }
    
    const res = await fetch(`${baseURL}api/schedule-booking/`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    revalidatePath('/admin/schedule-booking');
    return await res.json();
}


export async function _scheduleBookingUpdateStatusAction(id: string | number, data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }
    
    const res = await fetch(`${baseURL}api/schedule-booking-status/${id}`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken?.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    revalidatePath(`/admin/schedule-booking/${id}`);
    return await res.json();
}


export async function _scheduleBookingDeleteAction(id: number | string) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }
    
    const res = await fetch(`${baseURL}api/schedule-booking/${id}`, {
      'method': 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    });
    revalidatePath('/admin/schedule-booking');
    return await res.json();
}