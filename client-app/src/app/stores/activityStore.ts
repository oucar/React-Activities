import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Activity, ActivityFormValues } from "../models/activity";
import agent from "../api/agent";
import { store } from "./store";
import { Profile } from "../models/profile";
import { format } from "date-fns";
import { Pagination, PagingParams } from "../models/pagination";
import { Category } from "../common/enums/categories";

export default class ActivityStore {
  // can store activities in a map instead of an array
  // which allows storing key/value pairs
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set("all", true);

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.activityRegistry.clear();
        this.loadActivities();
      }
    );
  }

  // Computed property
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime()
    );
  }

  // Computed property
  get groupedActivities() {
    return Object.entries(
      // reduce the activitiesByDate array to an object
      // an iterative method. It runs a "reducer" callback function over all elements in the array,
      // in ascending-index order, and accumulates them into a single value
      this.activitiesByDate.reduce((activities, activity) => {
        // get the date from the activity
        const date = format(activity.date!, "dd MMM yyyy");
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPredicate = (predicate: string, value: string | Date) => {
    const resetPredicate = () => {
      this.predicate.forEach((key) => {
        if (key !== "startDate") this.predicate.delete(key);
      });
    };
    switch (predicate) {
      case "all":
        resetPredicate();
        this.predicate.set("all", true);
        break;
      case "isGoing":
        resetPredicate();
        this.predicate.set("isGoing", true);
        break;
      case "isHost":
        resetPredicate();
        this.predicate.set("isHost", true);
        break;
      case "startDate":
        this.predicate.delete("startDate");
        this.predicate.set("startDate", value);
        break;
      case Category.Drinks:
      case Category.Culture:
      case Category.Film:
      case Category.Food:
      case Category.Music:
      case Category.Travel:
        resetPredicate();
        this.predicate.set("category", predicate);
        break;
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      if (key === "startDate") {
        params.append(key, (value as Date).toISOString());
      } else {
        params.append(key, value);
      }
    });
    return params;
  }

  // using an array for actions automatically binds the action to the class
  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Activities.list(this.axiosParams);
      result.data.forEach((activity) => {
        this.setActivity(activity);
      });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
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
    const user = store.userStore.user;

    if (user) {
      // check if the user is in the list of attendees
      activity.isGoing = activity.attendees!.some(
        (a) => a.username === user.username
      );
      activity.isHost = activity.hostUsername === user.username;
      activity.host = activity.attendees?.find(
        (x) => x.username === activity.hostUsername
      );
    }

    activity.date = new Date(activity.date!);
    this.activityRegistry.set(activity.id, activity);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createActivity = async (activity: ActivityFormValues) => {
    const user = store.userStore!.user;
    const profile = new Profile(user!);
    try {
      await agent.Activities.create(activity);
      const newActivity = new Activity(activity);
      newActivity.hostUsername = user!.username;
      newActivity.attendees = [profile];
      this.setActivity(newActivity);
      runInAction(() => (this.selectedActivity = newActivity));
    } catch (error) {
      console.log(error);
    }
  };

  updateActivity = async (activity: ActivityFormValues) => {
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        if (activity.id) {
          let updatedActivity = {
            ...this.getActivity(activity.id),
            ...activity,
          };
          this.activityRegistry.set(activity.id, updatedActivity as Activity);
          this.selectedActivity = updatedActivity as Activity;
        }
      });
    } catch (error) {
      console.log(error);
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
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;

    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity?.isGoing) {
          // remove the user from the list of attendees
          this.selectedActivity.attendees =
            this.selectedActivity.attendees?.filter(
              (a) => a.username !== user?.username
            );
          this.selectedActivity.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedActivity?.attendees?.push(attendee);
          this.selectedActivity!.isGoing = true;
        }
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      // we need to set loading to false regardless of the outcome
      runInAction(() => (this.loading = false));
    }
  };

  cancelActivityToggle = async () => {
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        this.selectedActivity!.isCancelled =
          !this.selectedActivity!.isCancelled;
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  };

  clearSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  updateAttendeeFollowing = (username: string) => {
    this.activityRegistry.forEach((activity) => {
      activity.attendees.forEach((attendee: Profile) => {
        if (attendee.username === username) {
          attendee.following
            ? attendee.followersCount--
            : attendee.followersCount++;
          attendee.following = !attendee.following;
        }
      });
    });
  };
}
