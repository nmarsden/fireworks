import { AppPO } from './app.po';
import { MainMenuModalPO } from './mainMenuModal.po';
import { PlayerReadyModalPO } from './playerReadyModal.po';
import { BoardPO } from './board.po';
import { browser, logging } from 'protractor';

describe('Fireworks App', () => {
  let appPO: AppPO;
  let mainMenuModalPO: MainMenuModalPO;
  let playerReadyModalPO: PlayerReadyModalPO;
  let boardPO: BoardPO;

  beforeEach(() => {
    appPO = new AppPO();
    mainMenuModalPO = new MainMenuModalPO();
    playerReadyModalPO = new PlayerReadyModalPO();
    boardPO = new BoardPO();
  });

  describe('Main menu modal', () => {
    beforeEach(() => {
      appPO.navigateTo();
    });

    it('should display FIREWORKS title', () => {
      expect(mainMenuModalPO.getMainMenuTitle()).toEqual('FIREWORKS');
    });

    it('should display start button', () => {
      expect(mainMenuModalPO.getStartButton().getText()).toEqual('Start');
    });

    it('should open player ready modal when start button clicked', () => {
      mainMenuModalPO.getStartButton().click();

      expect(playerReadyModalPO.isOpen()).toBeTruthy();
    });
  });

  describe('Player ready modal', () => {
    beforeEach(() => {
      appPO.navigateTo();
      mainMenuModalPO.getStartButton().click();
    });

    it('should display P1\'s Turn title', () => {
      expect(playerReadyModalPO.getHeadingText()).toEqual('P1\'s Turn');
    });

    it('should display ready button', () => {
      expect(playerReadyModalPO.getReadyButton().getAttribute('innerText')).toEqual('Ready');
    });

    it('should display board when ready button clicked', () => {
      playerReadyModalPO.getReadyButton().click();

      expect(boardPO.isDisplayed).toBeTruthy();
    });
  });

  describe('Board', () => {
    beforeEach(() => {
      appPO.navigateTo();
      mainMenuModalPO.getStartButton().click();
      playerReadyModalPO.getReadyButton().click();
    });
  });

  fdescribe('Initial State', () => {
    beforeEach(() => {
      // tslint:disable-next-line:max-line-length
      appPO.navigateTo('eyJnYW1lT3ZlckhlYWRpbmciOiIiLCJpc0hpZGVCb2FyZCI6dHJ1ZSwiaXNHYW1lV29uIjpmYWxzZSwiaXNHYW1lT3ZlciI6ZmFsc2UsImlzUGFydG5lclRpbGVzQ2hvc2VuIjpmYWxzZSwiaXNTaG93UGxheWVySGludHMiOmZhbHNlLCJpc1Nob3dQYXJ0bmVySGludHMiOmZhbHNlLCJjaG9zZW5UaWxlIjp7ImhpbnRzIjp7ImluY2x1ZGVkQ29sb3VycyI6W10sImV4Y2x1ZGVkQ29sb3VycyI6W10sImluY2x1ZGVkTnVtYmVycyI6W10sImV4Y2x1ZGVkTnVtYmVycyI6W119fSwiZnVzZVRva2VucyI6MywiaW5mb1Rva2VucyI6OCwiZGlzY2FyZGVkVGlsZXMiOltdLCJwbGF5ZWRUaWxlcyI6W10sInBhcnRuZXJUaWxlcyI6W3siaWQiOnsiZ3VpZCI6IjBjNzhiYTc1LTNiZGMtNDU3YS04MjVjLWExNGE1YjAwMGFkNiJ9LCJjb2xvdXIiOiJyYWluYm93IiwibnVtYmVyIjoxLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiIyOGM0ZTQ0MC1kOThlLTRjM2MtYjFjYi02ZDg4ODMzOGEzZTUifSwiY29sb3VyIjoid2hpdGUiLCJudW1iZXIiOjEsImhpbnRzIjp7ImluY2x1ZGVkQ29sb3VycyI6W10sImV4Y2x1ZGVkQ29sb3VycyI6W10sImluY2x1ZGVkTnVtYmVycyI6W10sImV4Y2x1ZGVkTnVtYmVycyI6W119LCJwb3NzaWJsZUNvbG91cnMiOlsid2hpdGUiLCJyZWQiLCJ5ZWxsb3ciLCJncmVlbiIsImJsdWUiLCJyYWluYm93Il0sInBvc3NpYmxlTnVtYmVycyI6WzEsMiwzLDQsNV19LHsiaWQiOnsiZ3VpZCI6IjMxZjJiOTViLWJkMTQtNGI1ZS1hNDVhLWNmZmE5MmNhZjEzYyJ9LCJjb2xvdXIiOiJyZWQiLCJudW1iZXIiOjEsImhpbnRzIjp7ImluY2x1ZGVkQ29sb3VycyI6W10sImV4Y2x1ZGVkQ29sb3VycyI6W10sImluY2x1ZGVkTnVtYmVycyI6W10sImV4Y2x1ZGVkTnVtYmVycyI6W119LCJwb3NzaWJsZUNvbG91cnMiOlsid2hpdGUiLCJyZWQiLCJ5ZWxsb3ciLCJncmVlbiIsImJsdWUiLCJyYWluYm93Il0sInBvc3NpYmxlTnVtYmVycyI6WzEsMiwzLDQsNV19LHsiaWQiOnsiZ3VpZCI6IjNiMWI4ZjViLWQyNmQtNDk4Mi04YzA3LTAyODhjN2MzNDI5ZiJ9LCJjb2xvdXIiOiJ5ZWxsb3ciLCJudW1iZXIiOjEsImhpbnRzIjp7ImluY2x1ZGVkQ29sb3VycyI6W10sImV4Y2x1ZGVkQ29sb3VycyI6W10sImluY2x1ZGVkTnVtYmVycyI6W10sImV4Y2x1ZGVkTnVtYmVycyI6W119LCJwb3NzaWJsZUNvbG91cnMiOlsid2hpdGUiLCJyZWQiLCJ5ZWxsb3ciLCJncmVlbiIsImJsdWUiLCJyYWluYm93Il0sInBvc3NpYmxlTnVtYmVycyI6WzEsMiwzLDQsNV19LHsiaWQiOnsiZ3VpZCI6ImI4ZjVmNzQ5LTk1NzYtNDViOS1hZGZhLWNkNmU5Y2RiNTQwNCJ9LCJjb2xvdXIiOiJncmVlbiIsIm51bWJlciI6MSwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX1dLCJwbGF5ZXJUaWxlcyI6W3siaWQiOnsiZ3VpZCI6IjU0Y2JmZmI2LTVhMmMtNDc4YS1hMTAxLWNjMzc3OGI0ZGRiZCJ9LCJjb2xvdXIiOiJ3aGl0ZSIsIm51bWJlciI6MSwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiNWE5MTI5ZDQtMGZhMy00NTIxLWFiMzgtZDBlY2IxYjUwNDc4In0sImNvbG91ciI6InJlZCIsIm51bWJlciI6MSwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiNGM3MjhlMDktYWJiNS00NGRhLWFkNGItODY1YWNhOTA1NjBmIn0sImNvbG91ciI6InllbGxvdyIsIm51bWJlciI6MSwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiMmZmMzQ4NGYtYzI0OC00ZGZiLWE3ODktNjExMDgzZDkwNTQzIn0sImNvbG91ciI6ImdyZWVuIiwibnVtYmVyIjoxLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI0YjA1MTEyZi1hMGM2LTQ0MmItYjcyZC1mZmQ0ZmVkMGRkNzQifSwiY29sb3VyIjoiYmx1ZSIsIm51bWJlciI6MSwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX1dLCJyZW1haW5pbmdUaWxlcyI6W3siaWQiOnsiZ3VpZCI6IjU5ZTg0MWRiLWU3MjctNGM4Mi04Y2JjLWM3OGRmNzEwYTUzZCJ9LCJjb2xvdXIiOiJibHVlIiwibnVtYmVyIjoxLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiIxZTQxMmVmOC1lNmE1LTRkNjgtYjViMC04ODhkODNkYTYwMWIifSwiY29sb3VyIjoicmFpbmJvdyIsIm51bWJlciI6MSwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiMWE4ZjcxMzYtNjM5Ni00NzIwLWI2MjktMDU2MTE1NTUyMGQ1In0sImNvbG91ciI6IndoaXRlIiwibnVtYmVyIjoxLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJkOWU4NGRmZS02MWQwLTQxNzMtYmYzYi1mOWIwMjA3N2RjZWIifSwiY29sb3VyIjoicmVkIiwibnVtYmVyIjoxLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI5YTVlYzg5Zi1lMDg4LTQ5YWEtODRmNi1lNDE4Mjc3NjVhNWQifSwiY29sb3VyIjoieWVsbG93IiwibnVtYmVyIjoxLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI3ZGJkNGVhNC03OWQ3LTQ1ZWQtYmUwNC0yMGNmZjc4ZmUzYjEifSwiY29sb3VyIjoiZ3JlZW4iLCJudW1iZXIiOjEsImhpbnRzIjp7ImluY2x1ZGVkQ29sb3VycyI6W10sImV4Y2x1ZGVkQ29sb3VycyI6W10sImluY2x1ZGVkTnVtYmVycyI6W10sImV4Y2x1ZGVkTnVtYmVycyI6W119LCJwb3NzaWJsZUNvbG91cnMiOlsid2hpdGUiLCJyZWQiLCJ5ZWxsb3ciLCJncmVlbiIsImJsdWUiLCJyYWluYm93Il0sInBvc3NpYmxlTnVtYmVycyI6WzEsMiwzLDQsNV19LHsiaWQiOnsiZ3VpZCI6ImM4ODYzMzkyLWQwMDktNGE3YS1hYjFhLTIyNDFjZWFlZWU0MCJ9LCJjb2xvdXIiOiJibHVlIiwibnVtYmVyIjoxLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiIyYTQ2OWRkOS00YjYyLTQwZGYtYWUxZC1mNTQ0MWQ3YzcxYzIifSwiY29sb3VyIjoicmFpbmJvdyIsIm51bWJlciI6MSwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiMjI2NTAyYzktZjQ2NC00MWRmLTgwODItODE3MjBlMWUzMmFkIn0sImNvbG91ciI6IndoaXRlIiwibnVtYmVyIjoyLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJhZTU2ZDBkNi02Zjk4LTRmNGUtYTgwMC00MWQ2N2IyNjc5NGEifSwiY29sb3VyIjoicmVkIiwibnVtYmVyIjoyLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJlNGYxMDE5NS1kZDE4LTRjM2ItYWE0Yi02YjM4OTJmNTM2YjcifSwiY29sb3VyIjoieWVsbG93IiwibnVtYmVyIjoyLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI0NjhmY2ZkMC0zMzZiLTQ5NmYtOGUzMi0yOWVmZmRiOGE1MTcifSwiY29sb3VyIjoiZ3JlZW4iLCJudW1iZXIiOjIsImhpbnRzIjp7ImluY2x1ZGVkQ29sb3VycyI6W10sImV4Y2x1ZGVkQ29sb3VycyI6W10sImluY2x1ZGVkTnVtYmVycyI6W10sImV4Y2x1ZGVkTnVtYmVycyI6W119LCJwb3NzaWJsZUNvbG91cnMiOlsid2hpdGUiLCJyZWQiLCJ5ZWxsb3ciLCJncmVlbiIsImJsdWUiLCJyYWluYm93Il0sInBvc3NpYmxlTnVtYmVycyI6WzEsMiwzLDQsNV19LHsiaWQiOnsiZ3VpZCI6ImZmZDlmNGNlLTg1ODktNDNmNi05ZTFhLTUzYzljYjMxMzFkOCJ9LCJjb2xvdXIiOiJibHVlIiwibnVtYmVyIjoyLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJiOWM2OTU3OS0yYWJlLTQ3OWYtYjQ3My03NzBjZDY4NTM0ZWEifSwiY29sb3VyIjoicmFpbmJvdyIsIm51bWJlciI6MiwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiYmQ5NDJiZTAtM2Q2Ni00NTRkLThmN2QtOTY4MzIwNDY0MzBmIn0sImNvbG91ciI6IndoaXRlIiwibnVtYmVyIjoyLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI3YmVjNjQzNS1iNjZjLTRjY2QtYThlNS03NWIzYzY1ZDU3ODEifSwiY29sb3VyIjoicmVkIiwibnVtYmVyIjoyLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI1YTBlYzVhOC1lZGU5LTRkYTUtOTMyZi03NzcyN2JhM2Q0MjQifSwiY29sb3VyIjoieWVsbG93IiwibnVtYmVyIjoyLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiIwZTAyNjZmMS03MzlkLTQ2MzQtOGFiMy1mMmIxZjFhOWVkNjEifSwiY29sb3VyIjoiZ3JlZW4iLCJudW1iZXIiOjIsImhpbnRzIjp7ImluY2x1ZGVkQ29sb3VycyI6W10sImV4Y2x1ZGVkQ29sb3VycyI6W10sImluY2x1ZGVkTnVtYmVycyI6W10sImV4Y2x1ZGVkTnVtYmVycyI6W119LCJwb3NzaWJsZUNvbG91cnMiOlsid2hpdGUiLCJyZWQiLCJ5ZWxsb3ciLCJncmVlbiIsImJsdWUiLCJyYWluYm93Il0sInBvc3NpYmxlTnVtYmVycyI6WzEsMiwzLDQsNV19LHsiaWQiOnsiZ3VpZCI6IjU1OTM2NzY0LWY4YTItNDU3OS1iMGNhLWU3NDE4ZDUwODAyNSJ9LCJjb2xvdXIiOiJibHVlIiwibnVtYmVyIjoyLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJmZjY1NjA5OC0zZGM0LTRhMGQtYTVjMy1mODc4Y2E1MDRiMzcifSwiY29sb3VyIjoicmFpbmJvdyIsIm51bWJlciI6MiwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiODk4MGU2NzktMDI1Mi00MDgxLTg1YmYtYmRkYmUwMjAwMGQ5In0sImNvbG91ciI6IndoaXRlIiwibnVtYmVyIjozLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI2MDRkYjY1Mi0wOTQzLTQxZTEtOTllOS1iNzdkZTRkYTc4ZDkifSwiY29sb3VyIjoicmVkIiwibnVtYmVyIjozLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI4NWVkY2ZkNi00YzQ4LTQ5OTUtYWIyOC0zNWZiN2YxZmUzYmIifSwiY29sb3VyIjoieWVsbG93IiwibnVtYmVyIjozLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI5MDY0ZTk3ZS1iZDc2LTQxZTktYmM3NC01ODgyN2IzYmY4NDUifSwiY29sb3VyIjoiZ3JlZW4iLCJudW1iZXIiOjMsImhpbnRzIjp7ImluY2x1ZGVkQ29sb3VycyI6W10sImV4Y2x1ZGVkQ29sb3VycyI6W10sImluY2x1ZGVkTnVtYmVycyI6W10sImV4Y2x1ZGVkTnVtYmVycyI6W119LCJwb3NzaWJsZUNvbG91cnMiOlsid2hpdGUiLCJyZWQiLCJ5ZWxsb3ciLCJncmVlbiIsImJsdWUiLCJyYWluYm93Il0sInBvc3NpYmxlTnVtYmVycyI6WzEsMiwzLDQsNV19LHsiaWQiOnsiZ3VpZCI6ImQ1ODI0MmQ2LWRkNzQtNDVlYS1hMDhmLTNmZjk2YjdlN2ZiNSJ9LCJjb2xvdXIiOiJibHVlIiwibnVtYmVyIjozLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiIxOTZmMWZkNC05ZTg5LTQ0N2ItOThjOC0zNDhhZmU5YzhjOWQifSwiY29sb3VyIjoicmFpbmJvdyIsIm51bWJlciI6MywiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiZjhiNGU4MWMtOWUxNC00ZjBhLTliOGItMzg5MjQ4ODE2ZjI0In0sImNvbG91ciI6IndoaXRlIiwibnVtYmVyIjozLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJjOGJjYjRjOS1lYjczLTQ4NDMtODJiMC02NTY5NWFkOTFhYjgifSwiY29sb3VyIjoicmVkIiwibnVtYmVyIjozLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiIyYTQ2OTI4Zi1hYTQ4LTRhYzAtYjc5NC1iZGFjOGI1MmUxMDUifSwiY29sb3VyIjoieWVsbG93IiwibnVtYmVyIjozLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJhYWJhNDQyMS1jMTMzLTRmNDktYTAwZi00MmU5YjUxMjQxMmEifSwiY29sb3VyIjoiZ3JlZW4iLCJudW1iZXIiOjMsImhpbnRzIjp7ImluY2x1ZGVkQ29sb3VycyI6W10sImV4Y2x1ZGVkQ29sb3VycyI6W10sImluY2x1ZGVkTnVtYmVycyI6W10sImV4Y2x1ZGVkTnVtYmVycyI6W119LCJwb3NzaWJsZUNvbG91cnMiOlsid2hpdGUiLCJyZWQiLCJ5ZWxsb3ciLCJncmVlbiIsImJsdWUiLCJyYWluYm93Il0sInBvc3NpYmxlTnVtYmVycyI6WzEsMiwzLDQsNV19LHsiaWQiOnsiZ3VpZCI6ImQ1M2NmYTFkLWNiNmItNDhjNi04NjFkLWMxZDIzOGFiNWQ0NiJ9LCJjb2xvdXIiOiJibHVlIiwibnVtYmVyIjozLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI0N2Q5NTk0Ny1kOTJlLTQ1NzUtYTY1NC0xNmI2OTFiMjJmYjkifSwiY29sb3VyIjoicmFpbmJvdyIsIm51bWJlciI6MywiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiODQxYmUyNGUtYWIzOC00NzkyLWI1MjEtMzY1ZjU5MGRmMjc1In0sImNvbG91ciI6IndoaXRlIiwibnVtYmVyIjo0LCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJjNjJmZDc3OC1iNWY4LTQzMTktOThiMy1lNDNhOTk3Zjk4NGUifSwiY29sb3VyIjoicmVkIiwibnVtYmVyIjo0LCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI1ZDI0NjY3OS03NGQ5LTRmZDMtOGI5ZS0xYTkzNTMxMDE5N2YifSwiY29sb3VyIjoieWVsbG93IiwibnVtYmVyIjo0LCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiIwZWE5NThlOS0wMTczLTQwNjItYTliZi05MzQ0ZjhmN2YwNzAifSwiY29sb3VyIjoiZ3JlZW4iLCJudW1iZXIiOjQsImhpbnRzIjp7ImluY2x1ZGVkQ29sb3VycyI6W10sImV4Y2x1ZGVkQ29sb3VycyI6W10sImluY2x1ZGVkTnVtYmVycyI6W10sImV4Y2x1ZGVkTnVtYmVycyI6W119LCJwb3NzaWJsZUNvbG91cnMiOlsid2hpdGUiLCJyZWQiLCJ5ZWxsb3ciLCJncmVlbiIsImJsdWUiLCJyYWluYm93Il0sInBvc3NpYmxlTnVtYmVycyI6WzEsMiwzLDQsNV19LHsiaWQiOnsiZ3VpZCI6ImQ2OGEzOGZlLTFjOWItNGM0ZC1iZTEwLWM1NjA5ZGExN2JiZCJ9LCJjb2xvdXIiOiJibHVlIiwibnVtYmVyIjo0LCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiIzNDY0ZjVkNS04MmNkLTQxZmEtODc4MS1hYWNhNGRkZDhlMjgifSwiY29sb3VyIjoicmFpbmJvdyIsIm51bWJlciI6NCwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiMTk0NGJjZjItZTNkNy00MTc4LTk3ZjEtNTQyZDkwNDc5YzQ0In0sImNvbG91ciI6IndoaXRlIiwibnVtYmVyIjo0LCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJiN2JmYWZmMC04YTZiLTRmOTctYThiMS1lYzQ1MjYxYWNkYTgifSwiY29sb3VyIjoicmVkIiwibnVtYmVyIjo0LCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI1M2Y0MDg2ZC05YzQ1LTRhMzEtYjlkNi1hNWU2NmY4MWVhYjQifSwiY29sb3VyIjoieWVsbG93IiwibnVtYmVyIjo0LCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJkYmJhN2RjMC03NTkwLTRjNDctOTkyNi0wNTgzMzhmYzlkNTEifSwiY29sb3VyIjoiZ3JlZW4iLCJudW1iZXIiOjQsImhpbnRzIjp7ImluY2x1ZGVkQ29sb3VycyI6W10sImV4Y2x1ZGVkQ29sb3VycyI6W10sImluY2x1ZGVkTnVtYmVycyI6W10sImV4Y2x1ZGVkTnVtYmVycyI6W119LCJwb3NzaWJsZUNvbG91cnMiOlsid2hpdGUiLCJyZWQiLCJ5ZWxsb3ciLCJncmVlbiIsImJsdWUiLCJyYWluYm93Il0sInBvc3NpYmxlTnVtYmVycyI6WzEsMiwzLDQsNV19LHsiaWQiOnsiZ3VpZCI6IjRhZTc4MzIzLTg3NTMtNGU1Ny1iY2FjLTE2NGZjMDMwNGNjYSJ9LCJjb2xvdXIiOiJibHVlIiwibnVtYmVyIjo0LCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI5ZjZhNTUxNC04MDA5LTRhM2ItYTI3Zi0xZDhlODlhODIxMDYifSwiY29sb3VyIjoicmFpbmJvdyIsIm51bWJlciI6NCwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiYzk2NzNhZDUtY2UxOS00YWEzLWEzYTQtMTM5NjcwNTAxNmU0In0sImNvbG91ciI6IndoaXRlIiwibnVtYmVyIjo1LCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJjMjRlMTEyOS1jOWRjLTQ4ZTEtOGRhMS02N2Y5MTExM2M5M2MifSwiY29sb3VyIjoicmVkIiwibnVtYmVyIjo1LCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJkNDY3MzA1OC1lZDU4LTRkZmMtYjJjMy0wNmFmZGZiMzg4OGMifSwiY29sb3VyIjoieWVsbG93IiwibnVtYmVyIjo1LCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJmMjlkZmJkMy04ZDFlLTRkNDctODU2MS0wOTQ5YzQ5OWRmNjgifSwiY29sb3VyIjoiZ3JlZW4iLCJudW1iZXIiOjUsImhpbnRzIjp7ImluY2x1ZGVkQ29sb3VycyI6W10sImV4Y2x1ZGVkQ29sb3VycyI6W10sImluY2x1ZGVkTnVtYmVycyI6W10sImV4Y2x1ZGVkTnVtYmVycyI6W119LCJwb3NzaWJsZUNvbG91cnMiOlsid2hpdGUiLCJyZWQiLCJ5ZWxsb3ciLCJncmVlbiIsImJsdWUiLCJyYWluYm93Il0sInBvc3NpYmxlTnVtYmVycyI6WzEsMiwzLDQsNV19LHsiaWQiOnsiZ3VpZCI6IjhiMGVkMGMwLWZmZmMtNGEzNS04ODIxLTJkNzVmNGMwOTA0ZiJ9LCJjb2xvdXIiOiJibHVlIiwibnVtYmVyIjo1LCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiJjYmI0ZTZjOC1kMjc3LTQ5NDItOWZkOC02MTY3MzZjNjQwNWYifSwiY29sb3VyIjoicmFpbmJvdyIsIm51bWJlciI6NSwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX1dLCJ0dXJuSW5mb1RleHQiOiJTdGFydGluZyBhIG5ldyBnYW1lIiwid2FpdGluZ1BsYXllciI6MSwiY3VycmVudFBsYXllciI6MCwiaXNPbkluaXRBbHJlYWR5Q2FsbGVkIjpmYWxzZX0=');

      // tslint:disable-next-line:max-line-length
      // appPO.navigateTo('eyJnYW1lT3ZlckhlYWRpbmciOiIiLCJpc0hpZGVCb2FyZCI6dHJ1ZSwiaXNHYW1lV29uIjpmYWxzZSwiaXNHYW1lT3ZlciI6ZmFsc2UsImlzUGFydG5lclRpbGVzQ2hvc2VuIjpmYWxzZSwiaXNTaG93UGxheWVySGludHMiOmZhbHNlLCJpc1Nob3dQYXJ0bmVySGludHMiOmZhbHNlLCJmdXNlVG9rZW5zIjozLCJpbmZvVG9rZW5zIjo4LCJwbGF5ZXJUaWxlcyI6W3siaWQiOnsiZ3VpZCI6IjMyYTQ1Njk3LTBjMDgtNGQ2NC04NzNhLTdkNzAzZmY1MTVhMyJ9LCJjb2xvdXIiOiJ3aGl0ZSIsIm51bWJlciI6MSwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiYzUwMjlkMzYtMTgyMy00MDkwLWE1M2UtOWJlNmRiZDU4NTM4In0sImNvbG91ciI6InJlZCIsIm51bWJlciI6MSwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiOGUxNWRiMzUtZDZkMy00ODlhLThkZGUtNjA0YTc4ZjMxNWQ1In0sImNvbG91ciI6InllbGxvdyIsIm51bWJlciI6MSwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX0seyJpZCI6eyJndWlkIjoiZjdiMGZiZWUtNjFiNS00OTVkLWIzYTktMzZiNWQ0YjUxMDBlIn0sImNvbG91ciI6ImdyZWVuIiwibnVtYmVyIjoxLCJoaW50cyI6eyJpbmNsdWRlZENvbG91cnMiOltdLCJleGNsdWRlZENvbG91cnMiOltdLCJpbmNsdWRlZE51bWJlcnMiOltdLCJleGNsdWRlZE51bWJlcnMiOltdfSwicG9zc2libGVDb2xvdXJzIjpbIndoaXRlIiwicmVkIiwieWVsbG93IiwiZ3JlZW4iLCJibHVlIiwicmFpbmJvdyJdLCJwb3NzaWJsZU51bWJlcnMiOlsxLDIsMyw0LDVdfSx7ImlkIjp7Imd1aWQiOiI4NzBlYTIxYS01ZTNlLTQxYTAtYjljNi05YjY5Y2RkOTM0MzIifSwiY29sb3VyIjoiYmx1ZSIsIm51bWJlciI6MSwiaGludHMiOnsiaW5jbHVkZWRDb2xvdXJzIjpbXSwiZXhjbHVkZWRDb2xvdXJzIjpbXSwiaW5jbHVkZWROdW1iZXJzIjpbXSwiZXhjbHVkZWROdW1iZXJzIjpbXX0sInBvc3NpYmxlQ29sb3VycyI6WyJ3aGl0ZSIsInJlZCIsInllbGxvdyIsImdyZWVuIiwiYmx1ZSIsInJhaW5ib3ciXSwicG9zc2libGVOdW1iZXJzIjpbMSwyLDMsNCw1XX1dLCJ0dXJuSW5mb1RleHQiOiJTdGFydGluZyBhIG5ldyBnYW1lIiwid2FpdGluZ1BsYXllciI6MSwiY3VycmVudFBsYXllciI6MCwiaXNPbkluaXRBbHJlYWR5Q2FsbGVkIjpmYWxzZX0=');
      // appPO.navigateTo('eyJpc09uSW5pdEFscmVhZHlDYWxsZWQiOmZhbHNlfQ==');
    });

    it('should log initiate state', () => {
      expect(mainMenuModalPO.getMainMenuTitle()).toEqual('FIREWORKS');
    });
  });

  afterEach(async () => {
    // Get browser logs
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    // Print browser logs
    logs.forEach( log => console.log(log.message) );
    // Assert that there are no errors emitted from the browser
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
