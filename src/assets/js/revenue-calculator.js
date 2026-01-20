const calculator = {
  // Set Default values
  percentage: 0.15, //Set since that is the first to display after submit
  results: undefined,

  init: function () {
    this.results = document.getElementById("results");
    this.wireUpEvents();
  },

  wireUpEvents: function () {
    document.getElementById("frmCalculator").onsubmit = this.onSubmitClick;

    document.getElementById("btnSubmit").onclick = this.onSubmitClick;

    results
      .querySelectorAll(".calc_percentage_button")
      .forEach((element) => (element.onclick = this.onPercentageClick));
  },

  onSubmitClick: function () {
    console.log(calculator);
    if (calculator.validateFields() === true) {
      calculator.calculate();

      // After 2.5s, form popup display
      setTimeout(function() {
        $('#excelFormview').click();
      }, 3500);
    }
    return false;
  },

  onPercentageClick: function () {
    const value = Number(this.getAttribute("data-value"));

    if (calculator.percentage !== value) {
      results.querySelectorAll(".calc_percentage_button").forEach((element) => {
        element.classList.remove("btn-primary");
        element.classList.add("btn-secondary");
      });

      this.classList.remove("btn-secondary");
      this.classList.add("btn-primary");

      calculator.percentage = value;
      calculator.calculate();
    }
  },

  validateFields: function () {
    const form = document.getElementById("frmCalculator");
    return form.reportValidity();
  },

  formatNumber: function (value, isCurrency) {
    let nResult = parseFloat(value);

    if (isCurrency === true || (nResult + "").indexOf(".") !== -1) {
      nResult = nResult.toFixed(2);
    }

    nResult = nResult + "";

    const decimalIndex = nResult.indexOf(".");
    const remainder = decimalIndex !== -1 ? nResult.substr(decimalIndex) : "";

    nResult = nResult.substr(0, decimalIndex !== -1 ? decimalIndex : undefined);

    if (nResult === "") nResult = "0";

    const chopped = nResult.split("").reverse();

    const parts = [];

    chopped.forEach((digit, index) => {
      if (index > 0 && (index + 1) % 3 === 1) parts.push(",");

      parts.push(digit);
    });

    nResult = parts.reverse().join("") + remainder;

    if (isCurrency == true) {
      nResult = "$" + nResult;
      nResult = nResult.replace(".00", "");
    }

    return nResult;
  },

  calculate: function () {
    const washes = Number(document.getElementById("txtCount").value);
    const revenue = Number(document.getElementById("txtRevenue").value.replace(/([,])+/g, ''));
    const averageWashAmount = 4;
    const membershipMultiplier = 2;
    const averageWashPrice = revenue / washes;
    const averageAmountPerCustomer = averageWashPrice * averageWashAmount;
    const uniqueCustomers = washes / averageWashAmount;
    const percentUnique_customers = uniqueCustomers * this.percentage;
    const averageMonthlyEverWashMembershipPrice =
      averageWashPrice * membershipMultiplier;
    const averageAnnualEverWashMembershipPrice =
      averageMonthlyEverWashMembershipPrice * 12;
    const annualEverWashMembershipConversionRevenue =
      percentUnique_customers * averageAnnualEverWashMembershipPrice;
    const grandTotal = annualEverWashMembershipConversionRevenue + revenue;
    const revenueIncrease = annualEverWashMembershipConversionRevenue / revenue;

    const nResult = {
      calc_percentage: this.formatNumber(this.percentage * 100, false) + "%",
      calc_total_washes: this.formatNumber(washes, false),
      calc_total_revenue: this.formatNumber(revenue, true),
      calc_average_wash_price: this.formatNumber(averageWashPrice, true),
      calc_average_wash_amount: this.formatNumber(averageWashAmount, false),
      calc_unique_customers: this.formatNumber(uniqueCustomers, false),
      calc_average_amount_per_customer: this.formatNumber(
        averageAmountPerCustomer,
        true
      ),
      calc_membership_multiplier: this.formatNumber(
        membershipMultiplier,
        false
      ),
      calc_average_ew_monthly_membership_price: this.formatNumber(
        averageMonthlyEverWashMembershipPrice,
        true
      ),
      calc_average_ew_annual_membership_price: this.formatNumber(
        averageAnnualEverWashMembershipPrice,
        true
      ),
      calc_percent_unique_customers: this.formatNumber(
        percentUnique_customers,
        false
      ),
      calc_annual_ew_membership_conversion_revenue: this.formatNumber(
        annualEverWashMembershipConversionRevenue,
        true
      ),
      calc_grand_total: this.formatNumber(grandTotal, true),
      calc_revenue_increase:
        this.formatNumber(revenueIncrease * 100, false) + "%",
    };

    Object.keys(nResult).forEach((key) => {
      this.results.querySelectorAll(`.${key}`).forEach((element) => {
        // element.innerHTML = nResult[key];
        if (
          element.classList.contains(
            "calc_annual_ew_membership_conversion_revenue"
          )
        ) {
          countUpRevenue(element, nResult[key]);
        } else {
          element.innerHTML = nResult[key];
        }
      });
    });
    this.results.classList.remove("d-none");
    this.results.classList.add("activated-calc");
  },

};

calculator.init();

// Animates the results for the revenue calculator so that the number counts up.
// @param element - is the html element that contains the result.
// @param target - is the revenue calculation, e.g. "$1230.90"
function countUpRevenue(element, target) {
  //Formats output into dollar format
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  let currentCount = 0;
  element.innerText = formatter.format(currentCount);
  if (typeof target === "string" || target instanceof String) {
    target = parseFloat(target.replace("$", "").replace(/,/g, ""));
  }
  if (typeof currentCount === "string" || currentCount instanceof String) {
    currentCount = parseFloat(currentCount.replace("$", "").replace(/,/g, ""));
  }

  const speed = 100; // change animation speed here, higher number = slower
  const inc = target / speed;

  const updateCount = () => {
    if (currentCount < target) {
      currentCount = Math.ceil(currentCount + inc);
      element.innerText = formatter.format(currentCount);
      setTimeout(updateCount, 1);
    } else {
      element.innerText = formatter.format(target);
    }
  };
  updateCount();
}
