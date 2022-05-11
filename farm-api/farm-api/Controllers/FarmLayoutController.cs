using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Model;
using Newtonsoft.Json;
using Repository.FarmLayout;
using System;

namespace farm_api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class FarmLayoutController : ControllerBase
    {
        public IFarmLayoutInterface repository = new FarmLayoutRepository();

        #region Phase
        [EnableCors()]
        [HttpGet]
        [Route("GetPhase")]
        public Object GetPhase(int FarmId)
        {
            if (FarmId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Phase Found" });
            }
            else
            {
                return repository.GetPhase(FarmId);
            }

        }

        [EnableCors()]
        [HttpPost]
        [Route("SavePhase")]
        public Object SavePhase([FromBody] Phase phase)
        {
            if (phase.Phase_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Name" });
            }
            if (phase.Farm_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Farm" });
            }
            if (phase.Farmer_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Farmer" });
            }
            else
            {
                return repository.SavePhase(phase);
            }
        }
        #endregion

        #region House
        [EnableCors()]
        [HttpGet]
        [Route("GetHouse")]
        public Object GetHouse(int PhaseId)
        {
            if (PhaseId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No House Found" });
            }
            else
            {
                return repository.GetHouse(PhaseId);
            }

        }

        [EnableCors()]
        [HttpPost]
        [Route("SaveHouse")]
        public Object SaveHouse([FromBody] House house)
        {
            if (house.House_Name == "")
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Name" });
            }
            if (house.Phase_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Phase" });
            }
            else
            {
                return repository.SaveHouse(house);
            }
        }
        #endregion
    }
}
