"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { baseURL } from "../baseURL";


export async function _profileViewAction() {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }
    const res = await fetch(`${baseURL}api/profile`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    });
    return await res.json();
}

export async function _profileStoreAction(data: any) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('COBBLESTONE_AUTH_TOKEN_COOKIE');
    if(!authToken?.value){ redirect('/auth/login'); }
    const res = await fetch(`${baseURL}api/profile`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    });
    revalidatePath('/admin/profile');
    return await res.json();
}