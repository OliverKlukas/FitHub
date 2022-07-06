import boughtPlanService from "../../services/boughtPlanService";

/**
 * Redux action that promises to retrieve all boughtPlan in db.
 *
 * @returns {(function(*): Promise<void>)|*}
 */
export function getboughtPlanList() {
  // when the backend call was successful and the boughtPlans are retrieved
  // in the dispatcher the boughtPlans will be added to the global state
  function onSuccess(boughtPlanList) {
    return { type: "GETboughtPlanLIST_SUCCESS", boughtPlanList: boughtPlanList };
  }
  // when the backend call was failed
  function onFailure(error) {
    // error handling
    console.log("Get all boughtPlan failed with", error);
  }

  return async (dispatch) => {
    try {
      // ask for all boughtPlan in the backend
      const boughtPlanList = await boughtPlanService.getboughtPlanList();
      // call onSuccess in context of redux
      dispatch(onSuccess(boughtPlanList));
    } catch (e) {
      onFailure(e);
    }
  };
}

/**
 * Redux action that promises to add boughtPlan to db async.
 *
 * @param boughtPlan
 * @returns {(function(*): Promise<void>)|*}
 */
export function addboughtPlan(boughtPlan) {
  function onSuccess() {
    return { type: "ADDboughtPlan_SUCCESS" };
  }
  function onFailure(error) {
    throw new Error(error);
  }

  return async (dispatch) => {
    try {
      await boughtPlanService.createboughtPlan(boughtPlan);
      dispatch(onSuccess());
    } catch (error) {
      dispatch(onFailure(error));
    }
  };
}


/**
 * Retrieves a single boughtPlan item.
 *
 * @param id
 * @returns {(function(*, *): Promise<void>)|*}
 */
export const getboughtPlan = (id) => {
  function onSuccess(boughtPlan) {
    return { type: "GETboughtPlan_SUCCESS", boughtPlan: boughtPlan };
  }
  function onFailure(error) {
    console.log("failed to load a boughtPlan", error);
  }

  return async (dispatch, getState) => {
    try {
      let boughtPlan = await boughtPlanService.getboughtPlan(id);
      dispatch(onSuccess(boughtPlan));
    } catch (e) {
      onFailure(e);
    }
  };
};

