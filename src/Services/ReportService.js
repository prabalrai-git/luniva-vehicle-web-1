import { fetch } from "../Helpers/HttpUtil";
import { GetCounterWiseTotalCollectionAmt, GetDatewiseCollectionDetails, GetDatewiseCollectionDetailsByCounter, GetRegisteredVehicleDetailsBydate, GetRouteWiseAssignedVehicleCountByDate } from "../Helpers/Url";

export const getDatewiseCollectionDetailsApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetDatewiseCollectionDetails}?fromdate=${data.fromdate}&todate=${data.todate}`);
        if (response?.status === 200) {
            successCallback(response?.data?.GetRoleDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getDatewiseRegisteredVehicleDetailsApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetRegisteredVehicleDetailsBydate}?fromdate=${data.fromdate}&todate=${data.todate}&companyId=${data.companyId}`);
        if (response?.status === 200) {
            successCallback(response?.data?.GetRoleDetails)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getDatewiseCollectionByCounterDetailsApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetDatewiseCollectionDetailsByCounter}?fromdate=${data.fromdate}&todate=${data.todate}&counterid=${data.counterid}&comapnyid=${data.comapnyid}`);
        if (response?.status === 200) {
            successCallback(response?.data?.CounterWiseCOllection)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getCounterwiseTotalCollectionAmtDetailsApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetCounterWiseTotalCollectionAmt}?fromdate=${data.fromdate}&todate=${data.todate}&comapnyid=${data.companyId}`);
        if (response?.status === 200) {
            successCallback(response?.data?.CounterWiseCOllectionTotal)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}

export const getRouteWiseAssignedVehicleCountDetailsApi = async (data, successCallback) => {
    try {
        const response = await fetch(`${GetRouteWiseAssignedVehicleCountByDate}?routeDate=${data.routeDate}&companyId=${data.companyId}`);
        if (response?.status === 200) {
            successCallback(response?.data)
        } else
            successCallback([])
    } catch (error) {
        successCallback([])
    }
}