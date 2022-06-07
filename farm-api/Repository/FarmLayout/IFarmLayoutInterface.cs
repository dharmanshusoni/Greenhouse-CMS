using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.FarmLayout
{
    public interface IFarmLayoutInterface
    {
        #region FarmLayout
        Object GetLayout(int farmLayoutId, int farmId);
        Object SaveLayout(Model.FarmLayout layoutData);
        Object UpdateLayout(Model.FarmLayout layoutData);
        Object GetLayoutData(int farmLayoutId);
        #endregion

        #region Phase
        //Object GetPhase(int farmId);
        //Object SavePhase(Model.Phase phaseData);
        #endregion

        #region House
        //Object GetHouse(int phaseId);
        //Object SaveHouse(Model.House houseData);
        #endregion
    }
}
