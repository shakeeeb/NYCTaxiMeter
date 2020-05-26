using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NYCTaxiMeter.Helpers.Abstract
{
    /// <summary>
    /// Interface representing a trip calculator.
    /// </summary>
    /// <typeparam name="ITripModel">The Trip Model over which to do a Trip calculation.</typeparam>
    interface ITripCalculator<ITripModel>
    {
        /// <summary>
        /// Calculates the price for the selected trip model.
        /// </summary>
        /// <param name="model">The Trip Model.</param>
        /// <returns>The price of the trip as a decimal.</returns>
        decimal CalculatePrice(ITripModel model);
    }
}
