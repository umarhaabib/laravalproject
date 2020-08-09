function getMaxBonusRate (amount, interestRate, bonusListJson) {
    var maxRate = 0;
    var bonusId = 0;
    $.each(bonusListJson, function(i, item) {
        var startAmount = item.startAmount;
        var endAmount = item.endAmount;
        var rate = item.rate;

        if ((amount >= startAmount || startAmount === -1) && (amount < endAmount || endAmount ===-1)) {
            if (rate > maxRate) {
                maxRate = rate;
                bonusId = i;
            }
        }
    });
    return {maxRate:maxRate,bonusId:bonusId}
}

function hideAllBonusItems(listClassName) {
    $("." + listClassName).attr("style", "display:none!important");
    $(".trBaseRate").removeClass("tr-collapse");
    $(".tdBaseRate").removeClass("open");
    $(".trDescription").removeClass("open");
    $("#collapseInterest").removeClass("show");
    // $("#itemLabelCollapsed").addClass("collapsed");

}
function showActualBonusItem(bonusId) {
    hideAllBonusItems("bonus-list-items");
    $("._" + bonusId  + "_").removeAttr("style");
}

function processBonusByAmount(amontValue, interestRate,interestRateToString, bonusListJson) {
    // var amount = $("#amount").val();
    hideAllBonusItems("bonus-list-items");
    hideAllBonusItems("bonus-list-items-bottom");
    var valueStringEmpty = calculateTotalInterestRateString(interestRateToString, 0);

    if (amontValue) {
        var totalInterestRate = interestRate ;
        var bonusResult = getMaxBonusRate(parseInt(amontValue), interestRate, bonusListJson);
        if (bonusResult.maxRate > 0) {
            showActualBonusItem(bonusResult.bonusId);

            $("#trBaseRate").addClass("tr-collapse");
            $("#tdBaseRate").addClass("open");
            $("#trDescription").addClass("open");
            $("#collapseInterest").addClass("show");
            $("#itemLabelCollapsed").removeClass("collapsed");
        } else {
            $(".bonus-list-items").removeAttr("style");
            $("#interestRateAmountBox").html(valueStringEmpty);
        }

        totalInterestRate = calculateTotalInterestRate (interestRate, bonusResult.maxRate);
        $("#interestRateAmount").html(totalInterestRate + "%");

        var valueString = calculateTotalInterestRateString(interestRateToString, bonusResult.maxRate);
        $("#interestRateAmountBox").html(valueString);

    } else {
        $(".bonus-list-items").removeAttr("style");
        $("#interestRateAmountBox").html(valueStringEmpty);
    }





}
function calculateTotalInterestRate(interestRate, maxBonusRate) {
    return interestRate + maxBonusRate;

}
function calculateTotalInterestRateString(interestRate, maxBonusRate) {
    if (maxBonusRate > 0) {
        return interestRate + "%+" + maxBonusRate + "%";
    } else {
        return interestRate + "%"
    }

}
