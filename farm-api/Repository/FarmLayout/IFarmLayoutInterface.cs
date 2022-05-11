using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.FarmLayout
{
    public interface IFarmLayoutInterface
    {
        Object GetPhase(int farmId);
        Object SavePhase(Model.Phase phaseData);

        Object GetHouse(int phaseId);
        Object SaveHouse(Model.House houseData);
    }
}
