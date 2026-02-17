import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Quiz, QuizQuestion } from "@/lib/courseData";
import { CheckCircle, XCircle, Volume2 } from "lucide-react";

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: (score: number) => void;
  onCancel: () => void;
}

export default function QuizComponent({
  quiz,
  onComplete,
  onCancel,
}: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(quiz.questions.length).fill(-1)
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const question = quiz.questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== -1;
  const isCorrect =
    isAnswered && selectedAnswers[currentQuestion] === question.correctAnswer;

  const handleSelectAnswer = (optionIndex: number) => {
    if (!showFeedback) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = optionIndex;
      setSelectedAnswers(newAnswers);
    }
  };

  const handleSubmitAnswer = () => {
    if (!isAnswered) return;

    if (isCorrect) {
      setScore(score + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    } else {
      // Quiz complete
      const finalScore = Math.round(
        ((score + (isCorrect ? 1 : 0)) / quiz.questions.length) * 100
      );
      setQuizComplete(true);
    }
  };

  const handleFinishQuiz = () => {
    const finalScore = Math.round(
      ((score + (isCorrect ? 1 : 0)) / quiz.questions.length) * 100
    );
    onComplete(finalScore);
  };

  if (quizComplete) {
    const finalScore = Math.round(
      ((score + (isCorrect ? 1 : 0)) / quiz.questions.length) * 100
    );
    const passed = finalScore >= quiz.passingScore;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl bg-card border border-primary/20 p-8">
          <div className="text-center">
            {passed ? (
              <>
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-4xl font-bold text-primary mb-4">
                  Quiz Passed!
                </h2>
                <div className="text-5xl font-bold text-sidebar-primary mb-6">
                  {finalScore}%
                </div>
                <p className="text-lg text-muted-foreground mb-2">
                  Excellent work! You've earned
                </p>
                <p className="text-3xl font-bold text-yellow-400 mb-8">
                  +{quiz.diamondsReward} 💎
                </p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-4xl font-bold text-destructive mb-4">
                  Keep Practicing
                </h2>
                <div className="text-5xl font-bold text-muted-foreground mb-6">
                  {finalScore}%
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  You need {quiz.passingScore}% to pass. Try again!
                </p>
              </>
            )}

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-primary to-sidebar-primary hover:from-primary/90 hover:to-sidebar-primary/90 text-background font-bold px-8 py-3"
              >
                {passed ? "Continue" : "Retry Quiz"}
              </Button>
              <Button
                onClick={onCancel}
                variant="outline"
                className="border-primary/50 hover:border-primary hover:bg-primary/10 text-primary font-bold px-8 py-3"
              >
                Back to Module
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-card border border-primary/20 p-8">
        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-foreground">{quiz.title}</h2>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-sidebar-primary transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              const isCorrectOption = index === question.correctAnswer;
              const showCorrect = showFeedback && isCorrectOption;
              const showIncorrect =
                showFeedback && isSelected && !isCorrectOption;

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left font-semibold ${
                    showCorrect
                      ? "border-green-500 bg-green-500/10 text-green-300"
                      : showIncorrect
                        ? "border-destructive bg-destructive/10 text-destructive"
                        : isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 text-foreground hover:bg-primary/5"
                  } ${showFeedback ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && <CheckCircle className="h-5 w-5" />}
                    {showIncorrect && <XCircle className="h-5 w-5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div
            className={`p-4 rounded-lg mb-8 border ${
              isCorrect
                ? "border-green-500/50 bg-green-500/10 text-green-300"
                : "border-destructive/50 bg-destructive/10 text-destructive"
            }`}
          >
            <p className="font-semibold mb-2">
              {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
            </p>
            <p className="text-sm">{question.explanation}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 border-primary/50 hover:border-primary hover:bg-primary/10 text-primary font-bold py-3"
          >
            Exit Quiz
          </Button>

          {!showFeedback ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={!isAnswered}
              className={`flex-1 font-bold py-3 ${
                isAnswered
                  ? "bg-gradient-to-r from-primary to-sidebar-primary hover:from-primary/90 hover:to-sidebar-primary/90 text-background"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={
                currentQuestion === quiz.questions.length - 1
                  ? handleFinishQuiz
                  : handleNextQuestion
              }
              className="flex-1 bg-gradient-to-r from-primary to-sidebar-primary hover:from-primary/90 hover:to-sidebar-primary/90 text-background font-bold py-3"
            >
              {currentQuestion === quiz.questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          )}
        </div>

        {/* Score Display */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-2">Current Score</p>
          <p className="text-2xl font-bold text-primary">
            {score} / {quiz.questions.length}
          </p>
        </div>
      </Card>
    </div>
  );
}
