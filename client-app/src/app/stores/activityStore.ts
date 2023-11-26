import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  // using an array for actions automatically binds the action to the class
  loadActivities = async () => {
    this.setLoadingInitial(true);

    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activities.push(activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(`ERROR Loading Activities: ${error}`);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((x) => x.id === id) ?? undefined;
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  // id is optional since for a new activity we don't have an id yet
  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createActivity = async(activity: Activity) => {
    this.loading = true;

    activity.id = uuid();
    try {
      await agent.Activities.create(activity);

      runInAction(() => {
        this.activities.push(activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });


    } catch (error) {
      console.log(`ERROR Creating Activity: ${error}`);
      this.loading = false;
    }
  }

  updateActivity = async(activity: Activity) => {
    this.loading = true;

    try {
      await agent.Activities.update(activity);

      runInAction(() => {
        this.activities = [...this.activities.filter(x => x.id !== activity.id), activity];
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(`ERROR Updating Activity: ${error}`);
      this.loading = false;
    }
  }
}
