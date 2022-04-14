using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Farm
{
    public interface IFarmInterface
    {
        Object GetFarmsForFarmer(int farmerId);
        Object SaveFarm(Model.Farm farm);
        Object UpdateFarm(Model.Farm farm);
        Object GetFarmDetail(int farmId);
    }
}
