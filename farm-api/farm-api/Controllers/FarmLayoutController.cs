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

        #region Layout
        [EnableCors()]
        [HttpGet]
        [Route("GetLayout")]
        public Object GetLayout(int FarmLayoutId, int FarmId)
        {
            if (FarmId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Layout Found" });
            }
            else
            {
                return repository.GetLayout(FarmLayoutId, FarmId);
            }

        }

        [EnableCors()]
        [HttpGet]
        [Route("GetLayoutData")]
        public Object GetLayoutData(int FarmLayoutId)
        {
            if (FarmLayoutId < 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "No Layout Data Found" });
            }
            else
            {
                return repository.GetLayoutData(FarmLayoutId);
            }

        }

        [EnableCors()]
        [HttpPost]
        [Route("SaveLayout")]
        public Object SaveLayout([FromBody] FarmLayout layout)
        {
            if (layout.Zone == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Zone" });
            }
            if (layout.Farm_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Farm" });
            }
            if (layout.Phases == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Phases" });
            }
            if (layout.House == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select House" });
            }
            if (layout.Posts == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Posts" });
            }
            else
            {
                return repository.SaveLayout(layout);
            }
        }

        [EnableCors()]
        [HttpPost]
        [Route("UpdateLayout")]
        public Object UpdateLayout([FromBody] FarmLayout layout)
        {
            if (layout.Farm_Layout_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Layout" });
            }
            if (layout.Zone == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Insert Zone" });
            }
            if (layout.Farm_Id == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Farm" });
            }
            if (layout.Phases == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Phases" });
            }
            if (layout.House == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select House" });
            }
            if (layout.Posts == 0)
            {
                return JsonConvert.SerializeObject(new Result { message = "Select Posts" });
            }
            else
            {
                return repository.UpdateLayout(layout);
            }
        }
        #endregion

        #region Phase
        //[EnableCors()]
        //[HttpGet]
        //[Route("GetPhase")]
        //public Object GetPhase(int FarmId)
        //{
        //    if (FarmId < 0)
        //    {
        //        return JsonConvert.SerializeObject(new Result { message = "No Phase Found" });
        //    }
        //    else
        //    {
        //        return repository.GetPhase(FarmId);
        //    }

        //}

        //[EnableCors()]
        //[HttpPost]
        //[Route("SavePhase")]
        //public Object SavePhase([FromBody] Phase phase)
        //{
        //    if (phase.Phase_Name == "")
        //    {
        //        return JsonConvert.SerializeObject(new Result { message = "Insert Name" });
        //    }
        //    if (phase.Farm_Id == 0)
        //    {
        //        return JsonConvert.SerializeObject(new Result { message = "Select Farm" });
        //    }
        //    if (phase.Farmer_Id == 0)
        //    {
        //        return JsonConvert.SerializeObject(new Result { message = "Select Farmer" });
        //    }
        //    else
        //    {
        //        return repository.SavePhase(phase);
        //    }
        //}
        #endregion

        #region House
        //[EnableCors()]
        //[HttpGet]
        //[Route("GetHouse")]
        //public Object GetHouse(int PhaseId)
        //{
        //    if (PhaseId < 0)
        //    {
        //        return JsonConvert.SerializeObject(new Result { message = "No House Found" });
        //    }
        //    else
        //    {
        //        return repository.GetHouse(PhaseId);
        //    }

        //}

        //[EnableCors()]
        //[HttpPost]
        //[Route("SaveHouse")]
        //public Object SaveHouse([FromBody] House house)
        //{
        //    if (house.House_Name == "")
        //    {
        //        return JsonConvert.SerializeObject(new Result { message = "Insert Name" });
        //    }
        //    if (house.Phase_Id == 0)
        //    {
        //        return JsonConvert.SerializeObject(new Result { message = "Select Phase" });
        //    }
        //    else
        //    {
        //        return repository.SaveHouse(house);
        //    }
        //}
        #endregion
    }
}
