import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CourseData, UserProgress, initialCourses, initialUserProgress } from "@/lib/courseData";

interface GameContextType {
  courses: CourseData[];
  userProgress: UserProgress;
  addDiamonds: (amount: number) => void;
  spendDiamonds: (amount: number) => boolean;
  unlockCourse: (courseId: string) => boolean;
  completeModule: (courseId: string, moduleId: string, score: number) => void;
  saveProgress: () => void;
  loadProgress: () => void;
  resetProgress: () => void;
  updateCourseProgress: (courseId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<CourseData[]>(initialCourses);
  const [userProgress, setUserProgress] = useState<UserProgress>(initialUserProgress);

  // Load progress from localStorage on mount
  useEffect(() => {
    loadProgress();
  }, []);

  // Auto-save progress whenever it changes
  useEffect(() => {
    saveProgress();
  }, [userProgress, courses]);

  const loadProgress = () => {
    try {
      const saved = localStorage.getItem("learnHackProgress");
      if (saved) {
        const data = JSON.parse(saved);
        setUserProgress(data.userProgress);
        setCourses(data.courses);
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
  };

  const saveProgress = () => {
    try {
      localStorage.setItem(
        "learnHackProgress",
        JSON.stringify({
          userProgress,
          courses,
          lastSaved: new Date().toISOString(),
        })
      );
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  };

  const resetProgress = () => {
    setUserProgress(initialUserProgress);
    setCourses(initialCourses);
    localStorage.removeItem("learnHackProgress");
  };

  const addDiamonds = (amount: number) => {
    setUserProgress((prev) => ({
      ...prev,
      diamonds: prev.diamonds + amount,
      totalDiamondsEarned: prev.totalDiamondsEarned + amount,
    }));
  };

  const spendDiamonds = (amount: number): boolean => {
    if (userProgress.diamonds >= amount) {
      setUserProgress((prev) => ({
        ...prev,
        diamonds: prev.diamonds - amount,
      }));
      return true;
    }
    return false;
  };

  const unlockCourse = (courseId: string): boolean => {
    const course = courses.find((c) => c.id === courseId);
    if (!course || course.unlocked) return false;

    if (spendDiamonds(course.requiredDiamonds)) {
      setCourses((prev) =>
        prev.map((c) => (c.id === courseId ? { ...c, unlocked: true } : c))
      );
      setUserProgress((prev) => ({
        ...prev,
        coursesUnlocked: [...prev.coursesUnlocked, courseId],
      }));
      return true;
    }
    return false;
  };

  const completeModule = (courseId: string, moduleId: string, score: number) => {
    // Mark module as completed
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? {
              ...course,
              modules: course.modules.map((module) =>
                module.id === moduleId
                  ? { ...module, completed: true, score }
                  : module
              ),
            }
          : course
      )
    );

    // Update user progress
    setUserProgress((prev) => {
      const newProgress = { ...prev };
      if (!newProgress.modulesCompleted[courseId]) {
        newProgress.modulesCompleted[courseId] = [];
      }
      if (!newProgress.modulesCompleted[courseId].includes(moduleId)) {
        newProgress.modulesCompleted[courseId].push(moduleId);
      }
      if (!newProgress.quizScores[courseId]) {
        newProgress.quizScores[courseId] = {};
      }
      newProgress.quizScores[courseId][moduleId] = score;
      return newProgress;
    });

    // Award diamonds based on score
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      const module = course.modules.find((m) => m.id === moduleId);
      if (module && score >= module.quiz.passingScore) {
        addDiamonds(module.quiz.diamondsReward);
      }
    }
  };

  const updateCourseProgress = (courseId: string) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id === courseId) {
          const completedModules = course.modules.filter((m) => m.completed).length;
          const progress = Math.round(
            (completedModules / course.modules.length) * 100
          );
          return { ...course, progress };
        }
        return course;
      })
    );
  };

  return (
    <GameContext.Provider
      value={{
        courses,
        userProgress,
        addDiamonds,
        spendDiamonds,
        unlockCourse,
        completeModule,
        saveProgress,
        loadProgress,
        resetProgress,
        updateCourseProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
}
