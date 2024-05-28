import execa from 'execa';

export const runCommand = async (command: string) => {
  const { stdout } = await execa.execaCommand(command)
  return stdout
};
