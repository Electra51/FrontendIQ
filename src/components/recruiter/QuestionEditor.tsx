"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/src/components/ui/Button";

export interface Question {
  questionText: string;
  type: string;
  options: string[];
  correctAnswer: string | number;
  points: number;
}

interface QuestionEditorProps {
  questions: Question[];
  onChange: (questions: Question[]) => void;
}

export default function QuestionEditor({ questions, onChange }: QuestionEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    onChange(updated);
  };

  const addOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push(`Option ${updated[qIndex].options.length + 1}`);
    onChange(updated);
  };

  const removeOption = (qIndex: number, optIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options = updated[qIndex].options.filter((_, i) => i !== optIndex);
    // Adjust correct answer if necessary
    if (updated[qIndex].correctAnswer === optIndex.toString()) {
      updated[qIndex].correctAnswer = "0";
    }
    onChange(updated);
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      questionText: "",
      type: "multiple-choice",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "0",
      points: 10,
    };
    onChange([...questions, newQuestion]);
    setExpandedIndex(questions.length);
  };

  const removeQuestion = (index: number) => {
    const updated = questions.filter((_, i) => i !== index);
    onChange(updated);
    if (expandedIndex === index) setExpandedIndex(null);
  };

  return (
    <div className="space-y-4">
      {questions.map((q, qIndex) => {
        const isExpanded = expandedIndex === qIndex;
        return (
          <div key={qIndex} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
            <div
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition"
              onClick={() => setExpandedIndex(isExpanded ? null : qIndex)}
            >
              <h4 className="font-semibold text-gray-800 line-clamp-1">
                {qIndex + 1}. {q.questionText || "New Question"}
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {q.points} pts
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeQuestion(qIndex);
                  }}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-gray-100"
                >
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                      <textarea
                        value={q.questionText}
                        onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={2}
                        placeholder="E.g., What is the virtual DOM in React?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                      <div className="space-y-2">
                        {q.options.map((opt, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`correct-${qIndex}`}
                              checked={q.correctAnswer.toString() === optIndex.toString()}
                              onChange={() => handleQuestionChange(qIndex, "correctAnswer", optIndex.toString())}
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                              title="Mark as correct answer"
                            />
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder={`Option ${optIndex + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeOption(qIndex, optIndex)}
                              disabled={q.options.length <= 2}
                              className="p-2 text-red-500 hover:bg-red-50 rounded disabled:opacity-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      {q.options.length < 5 && (
                        <button
                          type="button"
                          onClick={() => addOption(qIndex)}
                          className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
                        >
                          <Plus className="w-4 h-4" /> Add Option
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                      <input
                        type="number"
                        value={q.points}
                        onChange={(e) => handleQuestionChange(qIndex, "points", parseInt(e.target.value) || 0)}
                        className="w-24 border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {questions.length < 10 && (
        <Button
          type="button"
          variant="outline"
          onClick={addQuestion}
          className="w-full flex items-center justify-center gap-2 border-dashed border-2 py-4 text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50"
        >
          <Plus className="w-5 h-5" /> Add New Question ({10 - questions.length} remaining)
        </Button>
      )}
    </div>
  );
}
