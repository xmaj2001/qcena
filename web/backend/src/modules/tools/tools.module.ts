import { Module } from '@nestjs/common';
import { McpModule } from '@rekog/mcp-nest';
import { ServiceModule } from '../services/service.module';
import { ListServiceTool } from './services/list-service.tool';

@Module({
  imports: [
    McpModule.forRoot({
      name: 'Qcena MCP',
      version: '1.0.0',
    }),
    ServiceModule,
  ],
  providers: [ListServiceTool], // ← regista aqui
})
export class ToolsModule {}
