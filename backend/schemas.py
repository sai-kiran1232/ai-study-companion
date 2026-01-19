from pydantic import BaseModel, Field


class StudyPlanRequest(BaseModel):
    subject: str = Field(..., description="Subject the student wants to study")
    level: str = Field(..., description="Beginner, Intermediate, or Advanced")
    hours_per_day: int = Field(..., gt=0, description="Hours available per day")


class StudyPlanResponse(BaseModel):
    study_plan: str = Field(..., description="Detailed study plan")
    explanation: str = Field(..., description="Simple explanation for the student")
