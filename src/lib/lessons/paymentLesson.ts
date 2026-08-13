// src/lib/lessons/paymentLesson.ts
// Lesson Definition — plain data (инвариант: предметное знание живёт здесь, не в runtime).
// 9 эпизодов по согласованной таблице: request/response → PSP → 3 исхода →
// pending → время → webhook → declined → retry/guard → две машины.

import type { LessonDefinition } from '../lesson-runtime/lesson-types';

export const paymentLesson: LessonDefinition = {
  id: 'payment-lesson',
  objective:
    'Объяснить, что происходит с заказом, если платёж не даёт окончательного ответа сразу',
  priorKnowledge: ['http-request-response', 'микросервисы: сервис + БД'],
  scenes: [
    {
      id: 'post-pay',
      prior: 'Ты знаешь request/response: послал запрос — получил ответ.',
      task: 'Что произойдёт после POST /pay?',
      prediction: 'response → Order = paid',
      reveal:
        'POST /pay → ??? — ответа нет: запрос ушёл в систему, которая может не ответить сразу.',
      reasoning:
        'Твоя модель request/response предполагает мгновенный финальный ответ. Но платёж — не обычный запрос: решение принимает не одна система, и времени на него может уйти больше, чем длится один HTTP-обмен.',
      update: { visible: ['client', 'order', 'pay'], hidden: ['psp', 'bank', 'webhook'] },
      check: 'Почему request/response не описывает платёж?',
      nextProblem: 'Кто вообще отвечает на POST /pay?',
      hidden: ['psp', 'bank'],
    },
    {
      id: 'who-answers',
      prior: 'Ты знаешь микросервисы: заказ хранит Order Service, он же принимает POST /pay.',
      task: 'Кто решает судьбу денег после POST /pay?',
      prediction: 'Банк напрямую: Order Service → Bank',
      reveal:
        'Client → Order Service → PSP → Bank. Между тобой и банком стоит платёжный шлюз (PSP).',
      reasoning:
        'Деньги лежат на счету банка, а не в твоём сервисе. У Order Service нет доступа к этой правде — поэтому он не может считать ответ банка своей собственной истиной. PSP — граница между «моей правдой о заказе» и «чужой правдой о деньгах».',
      update: { visible: ['client', 'order', 'psp', 'bank'], hidden: ['webhook'] },
      check: 'Почему Order Service не может сам решить, что платёж успешен?',
      nextProblem: 'Что отвечает PSP, когда решение ещё не принято?',
      hidden: ['webhook'],
    },
    {
      id: 'three-outcomes',
      prior: 'Ты знаешь: сервис возвращает success или error.',
      task: 'Сколько исходов у платёжного запроса?',
      prediction: 'Два: успех или ошибка.',
      reveal: 'Три: succeeded / declined / pending. Плюс не финальный ответ — решение ещё не принято.',
      reasoning:
        'Банк может принять платёж, отклонить его — или оставить ждать. «Прошло/не прошло» — иллюзия: исходов три, и третий (pending) — не ошибка, а легитимное состояние.',
      update: { visible: ['client', 'order', 'psp', 'bank', 'succeeded', 'declined', 'pending'], hidden: ['webhook'] },
      check: 'Чем pending отличается от declined?',
      nextProblem: 'Ты получил pending. Что теперь должен делать Order Service?',
      hidden: ['webhook'],
    },
    {
      id: 'order-pending',
      prior: 'Order — это состояние: created → ...',
      task: 'Payment = pending. Что должно стать с Order?',
      prediction: 'Order = paid (раз платёж «почти прошёл»).',
      reveal:
        'Order ≠ paid (нет финального подтверждения) и Order ≠ failed (платёж ещё не завершён). Order остаётся в промежуточном состоянии — ждёт.',
      reasoning:
        'Если я получил pending, я не могу поставить paid: у меня нет подтверждения, что деньги доступны. Но и failed поставить не могу — платёж ещё не завершён. Значит, мне нужно состояние, которое означает: решение ещё не принято.',
      update: { visible: ['order', 'payment', 'pending'], hidden: ['webhook'] },
      check: 'Какое состояние у Order, пока Payment = pending?',
      nextProblem: 'Когда же появится решение?',
      hidden: ['webhook'],
    },
    {
      id: 'time-enters',
      prior: 'Ты привык: запрос → ответ за один обмен.',
      task: 'Когда банк пришлёт окончательный ответ по pending?',
      prediction: 'Сразу, в том же HTTP-ответе.',
      reveal: 'Нет. Решение придёт позже — отдельным событием, через какое-то время.',
      reasoning:
        'У банка нет обязательства отвечать мгновенно. Поэтому в модель входит время: запрос ушёл сейчас, а финальный ответ придёт потом. Это не баг — это договорённость.',
      update: { visible: ['order', 'payment', 'pending', 'later'], hidden: ['webhook'] },
      check: 'Почему pending нельзя обработать синхронно, как обычный ответ?',
      nextProblem: 'Как Order Service узнает о решении, если ответ придёт не в этом запросе?',
      hidden: ['webhook'],
    },
    {
      id: 'webhook',
      prior: 'Ты знаешь опрос (polling): клиент сам переспрашивает.',
      task: 'Как Order Service узнает, что платёж завершился?',
      prediction: 'Order Service сам будет периодически опрашивать банк.',
      reveal:
        'Нет: банк сам пришлёт уведомление — webhook. Order Service не опрашивает, а получает событие.',
      reasoning:
        'Опрос — это нагрузка и задержка: ты переспрашиваешь, пока ответа нет. Webhook — это push: банк сам сообщает о результате. Но событие приходит не в том же запросе — оно асинхронное.',
      update: { visible: ['order', 'payment', 'later', 'webhook', 'succeeded'], hidden: [] },
      check: 'Чем webhook отличается от опроса?',
      nextProblem: 'А если банк ответил declined?',
      hidden: [],
    },
    {
      id: 'declined',
      prior: 'Ты знаешь: ошибка в запросе — это конец.',
      task: 'Payment = declined. Что делать с заказом?',
      prediction: 'Заказ умер: Order = cancelled, всё.',
      reveal: 'Не сразу. Сначала — повторная попытка (retry). Заказ переживает отказ платежа.',
      reasoning:
        'Отказ — не конец. Платёж мог не пройти по временной причине: лимит, сбой, подозрение. Система попробует списать ещё раз. Пока она пробует — заказ ждёт, а не отменяется.',
      update: { visible: ['order', 'payment', 'declined', 'retry'], hidden: [] },
      check: 'Почему declined не означает немедленную отмену заказа?',
      nextProblem: 'Сколько раз можно повторять?',
      hidden: [],
    },
    {
      id: 'retry-guard',
      prior: 'Ты знаешь: повторные попытки бывают бесконечными.',
      task: 'Когда прекратить повторять платёж?',
      prediction: 'Пока не пройдёт — повторяем бесконечно.',
      reveal: 'Нет: guard — attempts < max_attempts. Лимит попыток исчерпан → Order = cancelled.',
      reasoning:
        'Retry не может быть вечным: каждая попытка — это деньги, время и риск. Поэтому дизайн задаёт максимум попыток. Ограничение попыток — само по себе дизайн-решение, а не «обработка ошибок».',
      update: { visible: ['order', 'payment', 'retry', 'guard', 'cancelled'], hidden: [] },
      check: 'Зачем нужен лимит попыток?',
      nextProblem: 'Платёж и заказ — это две машины. Как они согласуются?',
      hidden: [],
    },
    {
      id: 'two-machines',
      prior: 'Ты видел весь путь: от POST /pay до cancelled.',
      task: 'Как связаны платёжная машина и машина заказа?',
      prediction: 'Order Service знает про PSP и управляет платёжным процессом.',
      reveal:
        'Нет: это две независимые state machines. Единственный мост между ними — событие payment.succeeded. Только оно переводит Order в paid.',
      reasoning:
        'Заказ и платёж — независимые механизмы, каждый со своими состояниями. Order не «управляется» Payment: он получает событие и сам решает перейти в paid. Согласование двух машин — это проектирование событий между ними, а не вложенность.',
      update: { visible: ['payment-machine', 'event', 'order-machine', 'fulfillment'], hidden: [] },
      check: 'Что является единственным мостом между Payment и Order?',
      hidden: [],
    },
  ],
};
