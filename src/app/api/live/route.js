export async function GET(request) {
  const encoder = new TextEncoder(); //ቴክስቱን ወደ byte ሚቀይርንን ነው

  let intervalId;
  let controllerRef;
  let closed = false;

  function cleanup() {
    if (intervalId) clearInterval(intervalId);

    if (!closed) {
      closed = true;

      try {
        controllerRef?.close();
      } catch {
        // ምናልባት ኮኔክሽኑ ተዘግቶ ሊሆን ስለሚችል
      }
    }
  }

  //   /ሰርቨሩ በአንድ ምላሽ ላይ ብዙ chunk እንዲልክ ለማድረግ

  const stream = new ReadableStream({
    start(controller) {
      controllerRef = controller;

      function sendUpdate() {
        if (closed) return;

        const data = {
          message: 'Live connection is working',
          time: new Date().toISOString(),
        };

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      }

      sendUpdate();
      intervalId = setInterval(sendUpdate, 3000);

      request.signal.addEventListener('abort', cleanup, {
        once: true,
      });
    },

    cancel() {
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}
