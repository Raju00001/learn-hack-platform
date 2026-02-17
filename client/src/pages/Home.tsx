/**
 * Learn Hack - Premium Gaming Aesthetic Learning Platform
 * 
 * Design Philosophy:
 * - Deep navy (#0f1419) background with neon cyan (#00d9ff) and electric purple (#b700ff) accents
 * - Geometric, angular shapes with sharp transitions
 * - Gamification as the core visual language
 * - Glowing effects and metallic gradients for premium feel
 * - Space Mono for headings (bold, geometric), Inter for body text, Courier Prime for code
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Zap, Lock, Unlock, Trophy, Target, BookOpen, Sparkles } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

export default function Home() {
  const { courses, userProgress, unlockCourse } = useGame();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);

  const handleUnlock = (courseId: string) => {
    if (unlockCourse(courseId)) {
      setShowUnlockAnimation(true);
      setTimeout(() => setShowUnlockAnimation(false), 2000);
    }
  };

  const handleCourseClick = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (course?.unlocked) {
      window.location.href = `/course?id=${courseId}`;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background geometric elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header Navigation */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold font-mono bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              LEARN HACK
            </div>
          </div>

          {/* Diamond Counter */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors">
            <div className="text-2xl">💎</div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Diamonds</div>
              <div className="text-lg font-bold text-primary">{userProgress.diamonds}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-background p-12">
            {/* Neon glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 pointer-events-none"></div>

            <div className="relative z-10">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Master Web Development
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Learn HTML, CSS, JavaScript, Java, Kotlin, and C++ through interactive modules. Complete quizzes to earn diamonds and unlock advanced courses.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-background font-bold px-8 py-3 rounded-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/75 transition-all"
                  onClick={() => {
                    const htmlCourse = courses.find((c) => c.id === "html");
                    if (htmlCourse?.unlocked) {
                      handleCourseClick("html");
                    }
                  }}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Learning
                </Button>

                <Button
                  variant="outline"
                  className="border-primary/50 hover:border-primary hover:bg-primary/10 text-primary font-bold px-8 py-3"
                >
                  <Trophy className="mr-2 h-5 w-5" />
                  View Progress
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-foreground">Available Courses</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="group relative overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                onClick={() => {
                  if (course.unlocked) {
                    handleCourseClick(course.id);
                  }
                }}
              >
                {/* Card background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-sidebar-primary/0 group-hover:from-primary/5 group-hover:to-sidebar-primary/5 transition-colors"></div>

                {/* Neon border effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 border border-primary/50 rounded-lg"></div>
                </div>

                <div className="relative z-10 p-6">
                  {/* Course Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{course.icon}</div>
                    {course.unlocked ? (
                      <Unlock className="h-5 w-5 text-primary" />
                    ) : (
                      <Lock className="h-5 w-5 text-destructive" />
                    )}
                  </div>

                  {/* Course Name and Level */}
                  <h3 className="text-2xl font-bold mb-2 text-foreground">{course.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        course.level === "beginner"
                          ? "bg-green-500/20 text-green-300"
                          : course.level === "intermediate"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {course.level.toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {course.modules.length} modules
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-sm font-bold text-primary">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-sidebar-primary transition-all duration-500 shadow-lg shadow-primary/50"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {course.unlocked ? (
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-sidebar-primary hover:from-primary/90 hover:to-sidebar-primary/90 text-background font-bold py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-primary/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCourseClick(course.id);
                      }}
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Continue Learning
                    </Button>
                  ) : (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlock(course.id);
                      }}
                      disabled={userProgress.diamonds < course.requiredDiamonds}
                      className={`w-full font-bold py-2 rounded-lg transition-all ${
                        userProgress.diamonds >= course.requiredDiamonds
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-background hover:shadow-lg hover:shadow-yellow-500/50"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Unlock ({course.requiredDiamonds} 💎)
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card border border-border/50 p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🎯</div>
              <div>
                <div className="text-sm text-muted-foreground">Courses Unlocked</div>
                <div className="text-3xl font-bold text-primary">
                  {userProgress.coursesUnlocked.length} / {courses.length}
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-card border border-border/50 p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📚</div>
              <div>
                <div className="text-sm text-muted-foreground">Modules Completed</div>
                <div className="text-3xl font-bold text-sidebar-primary">
                  {Object.values(userProgress.modulesCompleted).flat().length} /{" "}
                  {courses.reduce((sum, c) => sum + c.modules.length, 0)}
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-card border border-border/50 p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🏆</div>
              <div>
                <div className="text-sm text-muted-foreground">Total Diamonds</div>
                <div className="text-3xl font-bold text-yellow-400">
                  {userProgress.totalDiamondsEarned} 💎
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-16 py-8 text-center text-muted-foreground">
        <p>Learn Hack © 2026 - Master Web Development Through Gamified Learning</p>
      </footer>
    </div>
  );
}
