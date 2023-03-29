import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CopyField from ".";

test("should call onShowMessage function", async () => {
  const onShowMessage = jest.fn();

  const user = userEvent.setup();

  render(
    <CopyField
      onShowMessage={onShowMessage}
      value={"test"}
      label={"testLabel"}
    />
  );

  const button = screen.getByText("testLabel");

  await user.click(button);

  expect(onShowMessage).toHaveBeenCalledTimes(1);
});
