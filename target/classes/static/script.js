const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.open('localhost:8080/canvas/popup', 'todoList', 'width=700px,height=800px');

function makeCanvas() {
    const backgroundColor = document.getElementById("background-color").value;
    const contents = document.getElementById("contents").value;
    const fontColor = document.getElementById("font-color").value;
    const font = document.getElementById("font").value;
    const fontSize = document.getElementById("font-size").value;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px " + font
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    //ctx.textBaseline = 'middle';
    ctx.fillText(contents, canvas.width / 2, canvas.height / 2);
}

function reSizeCanvas(opt) {
    const sizeText = opt.options[opt.selectedIndex].text;
    const sizeArray = sizeText.split("*")
    ctx.canvas.width = sizeArray[0];
    ctx.canvas.height = sizeArray[1];
    makeCanvas()
    // resize를 했을 때, 설정이 다 날라가지 않도록.
}

function reColorCanvas(backgroundColor) {
    // 첫 번째 방법 : 메소드 인자로 this를 받아서 this의 value값을 ctx.fillStyle을 했다. -> 안됨
    // fillStyle 과 fillRect를 같이 쓰세요 ^^,,,
    // 두 번째 방법 : canvas.style.backgroundColor 로 설정 -> 됨. 왜??
    canvas.style.backgroundColor = backgroundColor.value;
}
// 바뀌는 옵션마다 다른 메소드를 만들려고 했는데
// 결국에는 하나가 바뀌면 다시 칠해야 하더라~...

function paymentStart() {
    // ------ 클라이언트 키로 객체 초기화 ------
    const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'
    const tossPayments = TossPayments(clientKey)

    // canvas 이미지 저장
    const dataURL = canvas.toDataURL();

    // 결제가 된 후에 다운로드가 되어야 한다.
    // successUrl 이 이미지 다운로드 링크가 되어야 한다.
    // 1. 스프링에서 받는다.
    // 2.

    // ------ 결제창 띄우기 ------
    /*
    tossPayments.requestPayment('카드', { // 결제수단 파라미터 (카드, 계좌이체, 가상계좌, 휴대폰 등)
        // 결제 정보 파라미터
        // 더 많은 결제 정보 파라미터는 결제창 Javascript SDK에서 확인하세요.
        // https://docs.tosspayments.com/reference/js-sdk
        amount: 100, // 결제 금액
        orderId: 'bVXRFLON4cmsG_7WMcU8F', // 주문 ID(주문 ID는 상점에서 직접 만들어주세요.)
        orderName: '테스트 결제', // 주문명
        customerName: '호갱님', // 구매자 이름
        successUrl: window.origin + "/javascript:alert('test')", // 결제 성공 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
        failUrl: window.origin + '/', // 결제 실패 시 이동할 페이지(이 주소는 예시입니다. 상점에서 직접 만들어주세요.)
    })
        // ------결제창을 띄울 수 없는 에러 처리 ------
        // 메서드 실행에 실패해서 reject 된 에러를 처리하는 블록입니다.
        // 결제창에서 발생할 수 있는 에러를 확인하세요.
        // https://docs.tosspayments.com/reference/error-codes#결제창공통-sdk-에러
        .catch(function (error) {
            if (error.code === 'USER_CANCEL') {
                // 결제 고객이 결제창을 닫았을 때 에러 처리
            } else if (error.code === 'INVALID_CARD_COMPANY') {
                // 유효하지 않은 카드 코드에 대한 에러 처리
            }
        });
        */

    tossPayments.requestPayment('카드', {
        amount: 100, // 결제 금액
        orderId: 'bVXRFLON4cmsG_7WMcU8F', // 주문 ID(주문 ID는 상점에서 직접 만들어주세요.)
        orderName: '테스트 결제', // 주문명
        customerName: '호갱님', // 구매자 이름
        // successUrl, failUrl, windowTarget 파라미터를 넘기지 마세요.
    })
        .then(function (data) {
            const anchor = document.createElement("a");
            anchor.href = canvas.toDataURL("image/png");
            anchor.download = "image.png";
            anchor.click();
        })
        .catch((error) => {
            // 에러 처리: 에러 목록을 확인하세요
            // https://docs.tosspayments.com/reference/error-codes#failurl로-전달되는-에러
            if (error.code === 'USER_CANCEL') {
                // 결제 고객이 결제창을 닫았을 때 에러 처리
            } else if (error.code === 'INVALID_CARD_COMPANY') {
                // 유효하지 않은 카드 코드에 대한 에러 처리
            }
        });
}