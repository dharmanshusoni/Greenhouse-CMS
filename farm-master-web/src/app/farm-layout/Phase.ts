export class Phase { 
    phase_Id:number;
    phase_Name:string;
    farm_Id:number;
    farmer_Id:number;
 }

 export class House { 
   HouseId:number;
   HouseNo:number;
   CropId:number;
   PhaseId:number;
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

 export class Post { 
  PostId:number;
  PostNo:number;
  PestId:number;
  BenificialsId:string;
  Intensity:number;
  Comment:string;
  Week :number;
  RowId:number;
  DeceaseId:number;
  Pic:string;
}