import * as React from "react"
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form"
import { clsx } from "clsx";
import { questions } from "@/data/questions";

type FormData = {
  answers: string[]
}

export default function Index() {
  const { handleSubmit, register, formState } = useForm<FormData>()
  const [result, setResult] = useState<number | null>(null);

  const onSubmit = useCallback((data: FormData) => {
    const result = data.answers
      .map(parseInt)
      .reduce((b, a) => a + b);

    setResult(result);
  }, []);

  return (
    <div className="w-[1024px] mx-auto pt-8">
      {result !== null && (
        <>
          <h1 className="text-3xl font-bold">Результат</h1>

          <div className="my-4 space-y-3">
            {result === 0 && (
              <p>У вас немає депресії</p>
            )}

            {result >= 1 && result <= 13 && (
              <p>У вас легка форма дипресії. Рекомендовано отримати огляд кваліфікованого фахівця</p>
            )}

            {result >= 14 && result <= 28 && (
              <p>У вас поміркована депресія. Рекомендовано отримати консультацію кваліфікованого фахівця</p>
            )}

            {result >= 29 && result <= 63 && (
              <p>У вас важка форма дипресії. Рекомендовано негайно отримати консультацію кваліфікованого фахівця.</p>
            )}

            <button
              onClick={() => setResult(null)}
              className="btn btn-primary btn-sm"
            > Пройти тест знову </button>
          </div>
        </>
      )}

      {result === null && (
        <>
          <h1 className="text-3xl font-bold">Інструкція</h1>
          <div className="my-4 space-y-3">
            <p>Цей опитувальник складається з 21 пункту, кожен з яких містить кілька варіантів тверджень. Будь ласка, уважно прочитайте всі варіанти відповідей до кожного пункту і виберіть один з них, який найкраще описує Ваше самопочуття протягом останніх двох тижнів, включаючи сьогоднішній день. Натисніть (клікніть) на вибраному твердженні. Переконайтеся, що Ви не пропустили жодного пункту.</p>
            <p>Після заповнення опитувальника натисніть на кнопку <strong>Обробити</strong></p>
          </div>
          <form className="pb-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12 mb-4">
              {questions.map((question, index) => (
                <div className={clsx(
                  formState.errors.answers?.[index]?.type === "required" && "text-red-600")
                }>
                  <h2 className="text-lg font-bold mb-2">{question.title}</h2>
                  <fieldset>
                    <ul className="space-y-2">
                      {question.answers.map(answer => (
                        <li
                          className={clsx("flex items-center space-x-3")}
                        >
                          <input
                            type="radio"
                            className="radio-sm"
                            value={answer.value}
                            {...register(`answers.${index}`, { required: true })}
                          />
                          <label>{answer.label}</label>
                        </li>
                      ))}
                    </ul>
                  </fieldset>
                </div>
              ))}
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Обробити</button>
          </form>
        </>
      )}
    </div>
  );
}
