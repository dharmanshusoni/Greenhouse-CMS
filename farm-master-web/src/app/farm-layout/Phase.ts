export class Phase { 
    phase_Id:number;
    phase_Name:string;
    farm_Id:number;
    farmer_Id:number;
 }

 export class House { 
    phase_Id:number;
    house_Name:string;
    house_Id:number;
 }

 export class Layout { 
   farm_Layout_Id:number;
   phases:number;
   zone:number;
   house:number;
   rows:number;
   farm_Id:number;
   posts:number;
}