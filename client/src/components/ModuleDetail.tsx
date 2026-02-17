import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Module } from "@/lib/courseData";
import QuizComponent from "./QuizComponent";
import { BookOpen, Play, CheckCircle, Lock, Zap } from "lucide-react";

interface ModuleDetailProps {
  module: Module;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function ModuleDetail({
  module,
  onComplete,
  onBack,
}: ModuleDetailProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [contentExpanded, setContentExpanded] = useState(true);

  if (showQuiz) {
    return (
      <QuizComponent
        quiz={module.quiz}
        onComplete={(score) => {
          onComplete(score);
          setShowQuiz(false);
        }}
        onCancel={() => setShowQuiz(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-4xl bg-card border border-primary/20 p-8 my-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 text-primary hover:text-primary hover:bg-primary/10"
          >
            ← Back to Course
          </Button>

          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {module.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {module.description}
              </p>
            </div>
            {module.completed && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/50">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-green-300 font-bold">Completed</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="mb-8">
          <button
            onClick={() => setContentExpanded(!contentExpanded)}
            className="w-full flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors mb-4"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">Module Content</span>
            </div>
            <span className="text-muted-foreground">
              {contentExpanded ? "▼" : "▶"}
            </span>
          </button>

          {contentExpanded && (
            <Card className="bg-background border border-border/50 p-6 mb-6">
              <div className="prose prose-invert max-w-none">
                <div className="text-foreground whitespace-pre-wrap leading-relaxed">
                  {module.content}
                </div>
              </div>

              {module.videoUrl && (
                <div className="mt-8 p-6 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Play className="h-5 w-5 text-primary" />
                    <span className="font-bold text-foreground">
                      Video Lesson
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Watch the video lesson to learn more about this topic.
                  </p>
                  <Button className="bg-gradient-to-r from-primary to-sidebar-primary hover:from-primary/90 hover:to-sidebar-primary/90 text-background font-bold">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Video
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Quiz Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-sidebar-primary/10 border border-primary/20 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {module.quiz.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {module.quiz.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Questions:
                    </span>
                    <span className="font-bold text-foreground">
                      {module.quiz.questions.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Passing Score:
                    </span>
                    <span className="font-bold text-foreground">
                      {module.quiz.passingScore}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Reward:
                    </span>
                    <span className="font-bold text-yellow-400">
                      +{module.quiz.diamondsReward} 💎
                    </span>
                  </div>
                </div>

                {module.completed && module.score !== undefined && (
                  <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/50">
                    <p className="text-sm text-muted-foreground mb-1">
                      Your Score
                    </p>
                    <p className="text-2xl font-bold text-green-400">
                      {module.score}%
                    </p>
                  </div>
                )}
              </div>

              <div className="text-4xl">🎯</div>
            </div>

            <Button
              onClick={() => setShowQuiz(true)}
              disabled={module.completed}
              className={`w-full font-bold py-3 rounded-lg transition-all ${
                module.completed
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-sidebar-primary hover:from-primary/90 hover:to-sidebar-primary/90 text-background hover:shadow-lg hover:shadow-primary/50"
              }`}
            >
              {module.completed ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Quiz Completed
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Start Quiz
                </>
              )}
            </Button>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 border-primary/50 hover:border-primary hover:bg-primary/10 text-primary font-bold py-3"
          >
            Back to Course
          </Button>
        </div>
      </Card>
    </div>
  );
}
