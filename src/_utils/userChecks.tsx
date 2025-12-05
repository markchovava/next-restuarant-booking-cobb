"use client"

export function isAdmin(i: number | string) {
      const num = Number(i)
      switch(num){
        case 1:
          return 'Admin';
        case 0:
          return 'User';
        default:
          return 'User';
      }

    }


export function checkRole(i: number | string) {
      const num = Number(i)
      switch(num){
        case 3:
          return 'Full Access';
        case 2:
          return 'Limited Access';
        case 1:
          return 'User Access';
        default:
          return 'User Access';
      }

    }