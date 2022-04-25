using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Plantation
{
    public interface IPlantationInterface
    {
        Object SavePlantation(Model.Plantation plantation);
        Object UpdatePlantation(Model.Plantation plantation);
        Object GetPlantationDetail(int plantationId);
    }
}
