using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Model;
using Newtonsoft.Json;
using Repository.Plantation;
using System;

namespace farm_api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PlantationController : ControllerBase
    {
        public IPlantationInterface repository = new PlantationRepository();
        
        [EnableCors()]
        [HttpGet]
        public Object GetPlantations(int PlantationId)
        {
            if (PlantationId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Pest Found" });
            }
            else
            {
                return repository.GetPlantationDetail(0);
            }

        }

        [EnableCors()]
        [HttpGet]
        [Route("GetPlantationDetail")]
        public Object GetPlantationDetail(int PlantationId)
        {
            if (PlantationId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Pest Found" });
            }
            else
            {
                return repository.GetPlantationDetail(PlantationId);
            }

        }

        [EnableCors()]
        [HttpPost]
        [Route("SavePlantation")]
        public Object SavePlantation([FromBody] Plantation plantation)
        {
            if (plantation.Plantation_Date.ToString() == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Plantation Date" });
            }
            if (plantation.Cleanout_Date.ToString() == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Cleanout Date" });
            }
            if (plantation.Crop_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Crop" });
            }
            else
            {
                return repository.SavePlantation(plantation);
            }
        }

        [EnableCors()]
        [HttpPost]
        [Route("UpdatePlantation")]
        public Object UpdatePlantation([FromBody] Plantation plantation)
        {
            if (plantation.Plantation_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Invalid Plantation" });
            }
            if (plantation.Plantation_Date.ToString() == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Plantation Date" });
            }
            if (plantation.Cleanout_Date.ToString() == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Cleanout Date" });
            }
            if (plantation.Crop_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Crop" });
            }
            else
            {
                return repository.UpdatePlantation(plantation);
            }
        }
    }
}
