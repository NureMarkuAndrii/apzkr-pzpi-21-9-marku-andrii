import { ComponentType } from "react";
import { COURSES_ROUTE, GRADES_ROUTE, MAIN_ROUTE, ROOMS_ROUTE, SCHEDULES_ROUTE, STUDENTS_ROUTE, TEACHERS_ROUTE } from "./consts";
import { Courses } from "./pages/Courses";
import { Grades } from "./pages/Grades";
import { MainPage } from "./pages/MainPage";
import { Rooms } from "./pages/Rooms";
import { Schedules } from "./pages/Schedules";
import { Students } from "./pages/Students";
import { Teachers } from "./pages/Teachers";

interface RouteData {
    path: string,
    Component: ComponentType,
}

export const applicationRoutes: RouteData[] = [
    { path: MAIN_ROUTE, Component: MainPage },
    { path: COURSES_ROUTE, Component: Courses },
    { path: GRADES_ROUTE, Component: Grades },
    { path: ROOMS_ROUTE, Component: Rooms },
    { path: SCHEDULES_ROUTE, Component: Schedules },
    { path: STUDENTS_ROUTE, Component: Students },
    { path: TEACHERS_ROUTE, Component: Teachers },
]