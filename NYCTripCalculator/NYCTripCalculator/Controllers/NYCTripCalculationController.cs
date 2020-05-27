using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NYCTaxiMeter.Helpers.Abstract;
using NYCTaxiMeter.Helpers.Concrete;
using NYCTaxiMeter.Models.Concrete;
using NYCTripCalculator.Models.Concrete;

namespace NYCTaxiMeter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NYCTripCalculationController : ControllerBase
    {
        private ITripCalculator<NYCTaxiTripModel> _calculator = new NYCTaxiTripCalculator();

        private readonly ILogger<NYCTripCalculationController> _logger;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="logger"></param>
        public NYCTripCalculationController(ILogger<NYCTripCalculationController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Given an NYCTaxiTripModel calculates the price and returns a pricemodel.
        /// </summary>
        /// <param name="model">An NYCTaxiTripModel.</param>
        /// <returns>A Price Model with the trip id and the price.</returns>
        [HttpPost("PostPrice", Name = "PostPrice")]
        public PriceModel PostPrice([FromBody] NYCTaxiTripModel model)
        {
            // Does calculation based on model here.
            var price = _calculator.CalculatePrice(model);
            return new PriceModel() { Price = price, TripId = model.TripId };
        }
    }
}
