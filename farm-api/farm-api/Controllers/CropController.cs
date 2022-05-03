using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Model;
using Newtonsoft.Json;
using Repository.Crop;
using System;

namespace farm_api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CropController : ControllerBase
    {
        public ICropInterface repository = new CropRepository();
        
        [EnableCors()]
        [HttpGet]
        public Object GetCrop(int CropId)
        {
            if (CropId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Crop Found" });
            }
            else
            {
                return repository.GetCropDetail(0);
            }

        }

        [EnableCors()]
        [HttpGet]
        [Route("GetCropDetail")]
        public Object GetCropDetail(int CropId)
        {
            if (CropId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Crop Found" });
            }
            else
            {
                return repository.GetCropDetail(CropId);
            }

        }

        [EnableCors()]
        [HttpPost]
        [Route("SaveCrop")]
        public Object SaveCrop([FromBody] Crop crop)
        {
            if (crop.Crop_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Crop Name" });
            }
            if (crop.Farmer_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Farmer" });
            }
            if (crop.Farm_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Farm" });
            }
            if (crop.Pest_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Pest" });
            }
            else
            {
                return repository.SaveCrop(crop);
            }
        }

        [EnableCors()]
        [HttpPost]
        [Route("UpdateCrop")]
        public Object UpdateCrop([FromBody] Crop crop)
        {
            if (crop.Crops_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Invalid Crop" });
            }
            if (crop.Crop_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Crop Name" });
            }
            if (crop.Farmer_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Farmer" });
            }
            if (crop.Farm_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Farm" });
            }
            if (crop.Pest_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Pest" });
            }
            else
            {
                return repository.UpdateCrop(crop);
            }
        }
    }
}
