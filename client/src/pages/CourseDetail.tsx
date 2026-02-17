import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGame } from "@/contexts/GameContext";
import ModuleDetail from "@/components/ModuleDetail";
import { ArrowLeft, CheckCircle, Lock, Play, Zap } from "lucide-react";

export default function CourseDetail() {
  const [, setLocation] = useLocation();
  const { courses, userProgress, completeModule, updateCourseProgress } =
    useGame();

  // Get course ID from URL (in a real app, use proper routing)
  const courseId = new URLSearchParams(window.location.search).get("id") || "";
  const course = courses.find((c) => c.id === courseId);

  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-card border border-border p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Course not found
          </h1>
          <Button
            onClick={() => setLocation("/")}
            className="bg-gradient-to-r from-primary to-sidebar-primary hover:from-primary/90 hover:to-sidebar-primary/90 text-background font-bold"
          >
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  const selectedModuleData = course.modules.find((m) => m.id === selectedModule);

  if (selectedModuleData) {
    return (
      <ModuleDetail
        module={selectedModuleData}
        onComplete={(score) => {
          if (courseId && selectedModule) {
            completeModule(courseId, selectedModule, score);
            updateCourseProgress(courseId);
          }
          setSelectedModule(null);
        }}
        onBack={() => setSelectedModule(null)}
      />
    );
  }

  const completedModules = course.modules.filter((m) => m.completed).length;
  const progress = Math.round((completedModules / course.modules.length) * 100);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background geometric elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setLocation("/")}
              variant="ghost"
              className="text-primary hover:text-primary hover:bg-primary/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="text-3xl">{course.icon}</div>
              <h1 className="text-2xl font-bold">{course.name}</h1>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Progress</p>
            <p className="text-2xl font-bold text-primary">{progress}%</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Course Overview */}
        <section className="mb-12">
          <Card className="bg-card border border-border/50 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Level</p>
                <p className="text-2xl font-bold text-foreground capitalize">
                  {course.level}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Modules</p>
                <p className="text-2xl font-bold text-foreground">
                  {completedModules} / {course.modules.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Diamonds Earned
                </p>
                <p className="text-2xl font-bold text-yellow-400">
                  {Object.values(userProgress.quizScores[courseId] || {})
                    .filter((score: number) => score >= 70)
                    .length * 5}{" "}
                  💎
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  Course Progress
                </span>
                <span className="text-sm font-bold text-primary">{progress}%</span>
              </div>
              <div className="h-3 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-sidebar-primary transition-all duration-500 shadow-lg shadow-primary/50"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </Card>
        </section>

        {/* Modules Grid */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-foreground">Modules</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {course.modules.map((module, index) => {
              const isCompleted = module.completed;
              const score = userProgress.quizScores[courseId]?.[module.id];

              return (
                <Card
                  key={module.id}
                  className="group relative overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                  onClick={() => setSelectedModule(module.id)}
                >
                  {/* Card background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-sidebar-primary/0 group-hover:from-primary/5 group-hover:to-sidebar-primary/5 transition-colors"></div>

                  <div className="relative z-10 p-6">
                    {/* Module Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            {module.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {module.description}
                          </p>
                        </div>
                      </div>
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      ) : (
                        <Play className="h-6 w-6 text-primary" />
                      )}
                    </div>

                    {/* Quiz Info */}
                    <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-sm font-bold text-foreground">
                          {module.quiz.title}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {module.quiz.questions.length} questions • Pass at{" "}
                        {module.quiz.passingScore}% • +{module.quiz.diamondsReward}{" "}
                        💎
                      </p>
                    </div>

                    {/* Score Display */}
                    {isCompleted && score !== undefined && (
                      <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/50 mb-4">
                        <p className="text-xs text-muted-foreground mb-1">
                          Your Score
                        </p>
                        <p className="text-lg font-bold text-green-400">
                          {(score as number)}%
                        </p>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      className={`w-full font-bold py-2 rounded-lg transition-all ${
                        isCompleted
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "bg-gradient-to-r from-primary to-sidebar-primary hover:from-primary/90 hover:to-sidebar-primary/90 text-background hover:shadow-lg hover:shadow-primary/50"
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start Module
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Completion Message */}
        {progress === 100 && (
          <div className="mt-12 p-8 rounded-lg border border-green-500/50 bg-green-500/10 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-green-400 mb-2">
              Course Completed!
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Congratulations! You've completed all modules in {course.name}.
            </p>
            <Button
              onClick={() => setLocation("/")}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-background font-bold px-8 py-3"
            >
              Back to Courses
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
