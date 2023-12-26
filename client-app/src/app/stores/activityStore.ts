import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  // can store activities in a map instead of an array
  // which allows storing key/value pairs
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Computed properties
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  get groupedActivities() {
    return Object.entries(
      // reduce the activitiesByDate array to an object
      // an iterative method. It runs a "reducer" callback function over all elements in the array, 
      // in ascending-index order, and accumulates them into a single value
      this.activitiesByDate.reduce((activities, activity) => {
        // get the date from the activity
        const date = activity.date;

        // get the activities for the date
        activities[date] = activities[date]
          // if the date exists, add the activity to the array
          ? [...activities[date], activity]
          // if the date doesn't exist, create a new array with the activity
          : [activity];

        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }


  // using an array for actions automatically binds the action to the class
  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activityRegistry.set(activity.id, activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(`ERROR Loading Activities: ${error}`);
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);

    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.setLoadingInitial(true);

      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        // This is needed due to the restrictions in the strict mode of React
        runInAction(() => {
          this.selectedActivity = activity;
        });
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(`ERROR Loading Activity: ${error}`);
        this.setLoadingInitial(false);
      }
    }
  };

  // GET and SET Activity methods are used internally to update the activityRegistry
  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createActivity = async (activity: Activity) => {
    this.loading = true;

    activity.id = uuid();
    try {
      await agent.Activities.create(activity);

      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(`ERROR Creating Activity: ${error}`);
      this.loading = false;
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;

    try {
      await agent.Activities.update(activity);

      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(`ERROR Updating Activity: ${error}`);
      this.loading = false;
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;

    try {
      await agent.Activities.delete(id);

      runInAction(() => {
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(`ERROR Deleting Activity: ${error}`);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
